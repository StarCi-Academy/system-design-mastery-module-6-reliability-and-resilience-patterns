/**
 * Controller thanh toán — route `GET /pay` ủy quyền xuống ClientService.
 * (EN: Payment controller — route `GET /pay` delegates to ClientService.)
 */
import {
    Controller,
    Get,
} from "@nestjs/common"
import {
    ClientService,
} from "./client.service"

@Controller()
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    /**
     * Logic — endpoint public cho client thực hiện thanh toán qua bank-service.
     * Code — `@Get("pay")` → gọi `clientService.pay()` (xử lý Timeout + Retry nội bộ).
     * (EN Logic: Public endpoint for client to execute payment through bank-service.)
     * (EN Code: `@Get("pay")` → calls `clientService.pay()` (handles Timeout + Retry internally).)
     */
    @Get("pay")
    pay() {
        return this.clientService.pay()
    }
}
