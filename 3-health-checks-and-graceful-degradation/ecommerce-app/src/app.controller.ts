import {
    Controller, Get, Post 
} from "@nestjs/common"
import {
    ConfigService,
} from "@nestjs/config"
import {
    HealthCheck,
    HealthCheckError,
    HealthCheckService,
    MemoryHealthIndicator,
} from "@nestjs/terminus"
import {
    AppService 
} from "./app.service"
import type {
    HealthConfig,
} from "./config"

@Controller()
export class AppController {
    private readonly healthConfig: HealthConfig

    constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    ) {
        this.healthConfig = this.configService.getOrThrow<HealthConfig>("health")
    }

    /**
   * Kiểm tra trạng thái Database theo cấu hình env giả lập.
   * (EN: Check simulated Database status from env config.)
   */
    private checkDatabase() {
        if (this.healthConfig.databaseStatus === "down") {
            throw new HealthCheckError("database check failed",
                {
                    database: {
                        status: "down" as const 
                    },
                })
        }
        return {
            database: {
                status: "up" as const 
            } 
        }
    }

  /**
   * Endpoint thực hiện Health Check cho hệ thống (Liveness/Readiness)
   * (EN: endpoint to perform System Health Check - Liveness/Readiness)
   *
   * @returns HealthCheckResult - Trạng thái sức khỏe hệ thống (EN: System health status)
   */
  @Get("health")
  @HealthCheck()
    healthCheck() {
    // Thực hiện kiểm tra các chỉ số sức khỏe (EN: perform health indicators check)
        return this.health.check([
            // Kiểm tra bộ nhớ Heap không được vượt quá 200MB (EN: check Heap memory doesn't exceed 200MB)
            () => this.memory.checkHeap("memory_heap",
                this.healthConfig.healthHeapThresholdBytes),
            // Giả lập kiểm tra kết nối Database theo env (EN: simulate Database connection check by env)
            () => this.checkDatabase(),
        ])
    }

  /**
   * Endpoint giả lập tăng tải bộ nhớ (EN: endpoint to simulate memory stress)
   *
   * @returns { status: string; message: string; blocks: number } - Trạng thái (EN: Status)
   */
  @Post("stress-memory")
  stressMemory() {
      // Ủy quyền cho service xử lý logic stress (EN: delegate stress logic to service)
      return this.appService.stressMemory()
  }

  /**
   * Endpoint lấy danh sách sản phẩm (Hỗ trợ Graceful Degradation)
   * (EN: endpoint to fetch products list - supports Graceful Degradation)
   *
   * @returns { status: string; message?: string; data: any[] } - Dữ liệu (EN: Data)
   */
  @Get("products")
  products() {
      // Ủy quyền cho service xử lý logic (EN: delegate logic to service)
      return this.appService.products()
  }
}
