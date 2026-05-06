import {
    Controller, Get, InternalServerErrorException 
} from "@nestjs/common"
import {
    ConfigService,
} from "@nestjs/config"
import type {
    InventoryBehaviorConfig,
} from "./config"

@Controller()
export class InventoryController {
    // Biến đếm số lần gọi thành công để giả lập lỗi (EN: success counter to simulate failures)
    private successCounter = 0
    private readonly failureAfterSuccessCount: number

    constructor(private readonly configService: ConfigService) {
        const behavior = this.configService.getOrThrow<InventoryBehaviorConfig>("inventory")
        this.failureAfterSuccessCount = behavior.failureAfterSuccessCount
    }

  /**
   * Endpoint cung cấp dữ liệu kho hàng (Giả lập lỗi sau 3 lần gọi thành công)
   * (EN: endpoint to provide inventory data - simulates failure after 3 successful calls)
   *
   * @returns { status: string; data: string } - Dữ liệu kho hàng (EN: Inventory data)
   * @throws InternalServerErrorException - Khi vượt quá ngưỡng thành công giả lập (EN: when exceeding simulated success threshold)
   */
  @Get("inventory")
    inventory(): { status: string; data: string } {
    // Tăng biến đếm mỗi lần gọi (EN: increment counter on every call)
        this.successCounter += 1

        // Logic: ngưỡng lỗi lấy từ env để dễ đổi kịch bản demo.
        // (EN Logic: failure threshold is env-driven for flexible demo scenarios.)
        // Code: ném 500 khi số lần success vượt ngưỡng cấu hình.
        // (EN Code: throw 500 when success count exceeds configured threshold.)
        if (this.successCounter > this.failureAfterSuccessCount) {
            // Ném lỗi nội bộ để kích hoạt Circuit Breaker ở Gateway (EN: throw internal error to trigger Circuit Breaker at Gateway)
            throw new InternalServerErrorException("Internal Server Error from Inventory Service")
        }

        // Trả về dữ liệu kho hàng thành công (EN: return successful inventory data)
        return {
            status: "success",
            data: "There are 10 products in stock",
        }
    }
}
