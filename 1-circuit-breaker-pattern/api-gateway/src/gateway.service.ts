import {
    Injectable, Logger 
} from "@nestjs/common"
import {
    ConfigService,
} from "@nestjs/config"
import axios from "axios"
import * as CircuitBreaker from "opossum"
import type {
    CircuitBreakerConfig,
    InventoryConfig,
} from "./config"

@Injectable()
export class GatewayService {
    private readonly logger = new Logger(GatewayService.name)
    private readonly inventoryBaseUrl: string
    private readonly inventoryTimeoutMs: number
    private readonly breaker: CircuitBreaker<
    [],
    { status: string; data: string; isFallback?: boolean }
  >

    constructor(private readonly configService: ConfigService) {
        const inventory = this.configService.getOrThrow<InventoryConfig>("inventory")
        const breaker = this.configService.getOrThrow<CircuitBreakerConfig>("circuitBreaker")
        this.inventoryBaseUrl = inventory.baseUrl
        this.inventoryTimeoutMs = inventory.timeoutMs

        // Logic: đọc endpoint và ngưỡng breaker từ ConfigModule để không hardcode.
        // (EN Logic: read inventory endpoint and breaker thresholds from ConfigModule to avoid hardcoded values.)
        // Code: khởi tạo opossum bằng options lấy từ namespace `circuitBreaker`.
        // (EN Code: initialize opossum with options loaded from the `circuitBreaker` namespace.)
        this.breaker = new CircuitBreaker(
            async () => {
                const { data } = await axios.get<{ status: string; data: string }>(
                    `${this.inventoryBaseUrl}/inventory`,
                    {
                        timeout: this.inventoryTimeoutMs 
                    },
                )
                return data
            },
            {
                timeout: breaker.timeoutMs,
                errorThresholdPercentage: breaker.errorThresholdPercentage,
                resetTimeout: breaker.resetTimeoutMs,
            },
        )

        // Cấu hình phản hồi dự phòng khi mạch hở hoặc lỗi (EN: configure fallback response when circuit is open or failing)
        this.breaker.fallback(() => ({
            status: "fallback",
            data: "Inventory system is busy, please try again later",
            isFallback: true,
        }))

        // Lắng nghe sự kiện trạng thái của mạch (EN: listen to circuit state events)
        this.breaker.on("open",
            () => this.logger.warn("Circuit state changed to: OPEN"))
        this.breaker.on("halfOpen",
            () =>
                this.logger.warn("Circuit state changed to: HALF_OPEN"),
        )
        this.breaker.on("close",
            () =>
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
