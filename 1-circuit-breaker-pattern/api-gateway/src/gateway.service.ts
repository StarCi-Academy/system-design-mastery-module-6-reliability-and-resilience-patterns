import { Injectable, Logger } from "@nestjs/common"
import axios from "axios"
import CircuitBreaker from "opossum"

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name)
  private readonly breaker: CircuitBreaker<
    [],
    { status: string; data: string; isFallback?: boolean }
  >

  constructor() {
    // Khởi tạo Circuit Breaker với logic gọi API Inventory (EN: initialize Circuit Breaker with Inventory API call logic)
    this.breaker = new CircuitBreaker(
      async () => {
        // Thực hiện request GET tới Inventory Service (EN: execute GET request to Inventory Service)
        const { data } = await axios.get<{ status: string; data: string }>(
          "http://localhost:3001/inventory",
          { timeout: 2000 },
        )
        return data
      },
      {
        timeout: 2500, // Timeout cho mỗi lần gọi (EN: timeout for each call)
        errorThresholdPercentage: 50, // Ngưỡng lỗi để ngắt mạch (EN: error threshold percentage to trip the circuit)
        resetTimeout: 5000, // Thời gian chờ trước khi thử lại ở trạng thái Half-Open (EN: wait time before retrying in Half-Open state)
      },
    )

    // Cấu hình phản hồi dự phòng khi mạch hở hoặc lỗi (EN: configure fallback response when circuit is open or failing)
    this.breaker.fallback(() => ({
      status: "fallback",
      data: "Inventory system is busy, please try again later",
      isFallback: true,
    }))

    // Lắng nghe sự kiện trạng thái của mạch (EN: listen to circuit state events)
    this.breaker.on("open", () => this.logger.warn("Circuit state changed to: OPEN"))
    this.breaker.on("halfOpen", () =>
      this.logger.warn("Circuit state changed to: HALF_OPEN"),
    )
    this.breaker.on("close", () =>
      this.logger.log("Circuit state changed to: CLOSED"),
    )
  }

  /**
   * Lấy thông tin kho hàng thông qua Circuit Breaker
   * (EN: get inventory information through Circuit Breaker)
   *
   * @returns Promise<{ status: string; data: string; isFallback?: boolean }> - Dữ liệu kho hàng (EN: Inventory data)
   */
  async getInventory() {
    // Kích hoạt thực thi qua Circuit Breaker (EN: trigger execution via Circuit Breaker)
    return this.breaker.fire()
  }
}
