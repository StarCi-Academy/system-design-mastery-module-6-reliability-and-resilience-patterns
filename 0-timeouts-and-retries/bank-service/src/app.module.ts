/**
 * Module gốc — đăng ký BankController cho dịch vụ ngân hàng giả lập.
 * (EN: Root module — registers BankController for simulated bank service.)
 */
import {
    Module,
} from "@nestjs/common"
import {
    BankController,
} from "./bank.controller"

@Module({
    controllers: [BankController],
})
export class AppModule {}
