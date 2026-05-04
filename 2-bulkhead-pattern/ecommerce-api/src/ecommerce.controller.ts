import { Controller, Get } from "@nestjs/common"
import { EcommerceService } from "./ecommerce.service"

@Controller()
export class EcommerceController {
  constructor(private readonly ecommerceService: EcommerceService) {}

  /**
   * Endpoint xem lịch sử giao dịch (Áp dụng Bulkhead)
   * (EN: endpoint to view transaction history - Bulkhead applied)
   *
   * @returns Promise<{ status: string; message: string }> - Lịch sử giao dịch (EN: Transaction history)
   */
  @Get("history")
  history() {
    // Ủy quyền cho service xử lý (EN: delegate processing to service)
    return this.ecommerceService.history()
  }

  /**
   * Endpoint thực hiện thanh toán (Không bị ảnh hưởng bởi lỗi của History)
   * (EN: endpoint to execute checkout - unaffected by History errors)
   *
   * @returns Promise<{ status: string; message: string }> - Kết quả thanh toán (EN: Payment result)
   */
  @Get("checkout")
  checkout() {
    // Ủy quyền cho service xử lý (EN: delegate processing to service)
    return this.ecommerceService.checkout()
  }
}
