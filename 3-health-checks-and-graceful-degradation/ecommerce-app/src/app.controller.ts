import { Controller, Get, Post } from "@nestjs/common"
import { HealthCheck, HealthCheckService, MemoryHealthIndicator } from "@nestjs/terminus"
import { AppService } from "./app.service"

@Controller()
export class AppController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly appService: AppService,
  ) {}

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
      () => this.memory.checkHeap("memory_heap", 200 * 1024 * 1024),
      // Giả lập kiểm tra kết nối Database (EN: simulate Database connection check)
      async () => ({ database: { status: "up" } }),
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
