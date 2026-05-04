import { Controller, Get } from "@nestjs/common"
import { ClientService } from "./client.service"

@Controller()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  /**
   * Endpoint thực hiện thanh toán tiền (EN: endpoint to execute payment)
   *
   * @returns Promise<{ status: string; message: string }> - Kết quả thanh toán (EN: Payment result)
   */
  @Get("pay")
  pay() {
    // Gọi service xử lý logic thanh toán (EN: call service to handle payment logic)
    return this.clientService.pay()
  }
}
