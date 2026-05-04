import { HttpException, HttpStatus, Injectable } from "@nestjs/common"

/**
 * Lớp điều phối giới hạn số lượng request đồng thời (Bulkhead)
 * (EN: class to coordinate concurrency limits - Bulkhead)
 */
class ConcurrencyLimiter {
  // Số lượng request hiện đang xử lý (EN: number of currently processing requests)
  private active = 0

  constructor(private readonly limit: number) {}

  /**
   * Thực thi hàm callback với giới hạn concurrency
   * (EN: execute callback function with concurrency limit)
   *
   * @param fn - Hàm cần thực thi (EN: function to execute)
   * @returns Promise<T> - Kết quả của hàm callback (EN: callback result)
   * @throws HttpException - Khi vượt quá giới hạn bulkhead (EN: when exceeding bulkhead limit)
   */
  async run<T>(fn: () => Promise<T>): Promise<T> {
    // Kiểm tra nếu số lượng request vượt quá giới hạn (EN: check if active requests exceed limit)
    if (this.active >= this.limit) {
      throw new HttpException(
        `Bulkhead Error: History API is overloaded (exceeded ${this.limit} concurrent threads). Please try again later!`,
        HttpStatus.TOO_MANY_REQUESTS,
      )
    }

    // Tăng biến đếm request đang xử lý (EN: increment active request counter)
    this.active += 1

    try {
      // Thực thi logic nghiệp vụ (EN: execute business logic)
      return await fn()
    } finally {
      // Giảm biến đếm khi hoàn tất (EN: decrement counter when finished)
      this.active -= 1
    }
  }
}

/**
 * Hàm hỗ trợ dừng thực thi
 * (EN: helper function to pause execution)
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

@Injectable()
export class EcommerceService {
  // Giới hạn chức năng xem lịch sử chỉ có 2 "khoang" xử lý (EN: limit history function to only 2 concurrent "compartments")
  private readonly historyLimiter = new ConcurrencyLimiter(2)

  /**
   * Lấy lịch sử giao dịch (Chức năng chậm - được áp dụng Bulkhead)
   * (EN: get transaction history - slow function with Bulkhead applied)
   *
   * @returns Promise<{ status: string; message: string }> - Lịch sử giao dịch (EN: Transaction history)
   */
  async history(): Promise<{ status: string; message: string }> {
    // Bao bọc logic trong limiter (EN: wrap logic inside the limiter)
    return this.historyLimiter.run(async () => {
      // Giả lập xử lý nặng mất 5 giây (EN: simulate heavy processing taking 5s)
      await sleep(5000)

      // Trả về dữ liệu lịch sử (EN: return history data)
      return {
        status: "success",
        message: "Transaction history: ...",
      }
    })
  }

  /**
   * Thực hiện thanh toán (Chức năng quan trọng - không bị giới hạn bởi vách ngăn của History)
   * (EN: execute checkout - critical function not limited by History's bulkhead)
   *
   * @returns Promise<{ status: string; message: string }> - Kết quả thanh toán (EN: Payment result)
   */
  async checkout(): Promise<{ status: string; message: string }> {
    // Trả về kết quả thành công ngay lập tức (EN: return success result immediately)
    return {
      status: "success",
      message: "Checkout successful",
    }
  }
}
