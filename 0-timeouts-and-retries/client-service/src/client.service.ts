import {
  GatewayTimeoutException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common"
import axios from "axios"

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name)

  /**
   * Thực hiện thanh toán với cơ chế Timeout và Retry (Exponential Backoff + Jitter)
   * (EN: Performs payment with Timeout and Retry mechanism using Exponential Backoff + Jitter)
   *
   * @returns Promise<{ status: string; message: string }> - Kết quả thanh toán (EN: Payment result)
   */
  async pay(): Promise<{ status: string; message: string }> {
    // Số lần thử lại tối đa (EN: maximum number of retries)
    const maxRetries = 3

    // Vòng lặp thực hiện các lần thử (EN: loop through attempts)
    for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
      try {
        // Ghi log lần gọi hiện tại (EN: log the current call attempt)
        this.logger.log(`Calling Bank Service, attempt ${attempt}`)

        // Gọi API ngân hàng với timeout 3 giây (EN: call bank API with 3s timeout)
        await axios.get("http://localhost:3001/transfer", {
          timeout: 3000,
        })

        // Trả về kết quả thành công (EN: return success result)
        return {
          status: "success",
          message: "Transfer successful",
        }
      } catch (error: unknown) {
        // Kiểm tra xem đã hết số lần thử chưa (EN: check if all attempts are exhausted)
        const isLastAttempt = attempt > maxRetries

        if (isLastAttempt) {
          // Xử lý lỗi timeout ở lần thử cuối cùng (EN: handle timeout error on the last attempt)
          if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
            throw new GatewayTimeoutException(
              "Gateway Timeout - Bank did not respond within 3s",
            )
          }

          // Ném lỗi chung sau khi thất bại toàn bộ lần thử (EN: throw general error after all retries failed)
          throw new InternalServerErrorException(
            "Payment failed after multiple retries",
          )
        }

        // Tính toán thời gian chờ theo Exponential Backoff (EN: calculate wait time using Exponential Backoff)
        const baseDelay = 2 ** (attempt - 1) * 1000

        // Thêm Jitter để tránh hiện tượng thundering herd (EN: add Jitter to prevent thundering herd effect)
        const jitter = Math.floor(Math.random() * 1000)
        const waitMs = baseDelay + jitter

        // Ghi log cảnh báo về việc thử lại (EN: log warning about the upcoming retry)
        this.logger.warn(`Retry attempt ${attempt} scheduled in ${waitMs}ms`)

        // Chờ trước khi thực hiện lần thử tiếp theo (EN: wait before the next attempt)
        await new Promise<void>((resolve) => {
          setTimeout(resolve, waitMs)
        })
      }
    }

    // Trường hợp hy hữu không rơi vào vòng lặp (EN: unexpected case outside the loop)
    throw new InternalServerErrorException("Unexpected execution flow")
  }
}

