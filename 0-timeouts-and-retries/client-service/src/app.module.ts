/**
 * Module gốc — đăng ký controller và service cho client thanh toán.
 * (EN: Root module — registers controller and service for payment client.)
 */
import {
    Module,
} from "@nestjs/common"
import {
    ClientController,
} from "./client.controller"
import {
    ClientService,
} from "./client.service"

@Module({
    controllers: [ClientController],
    providers: [ClientService],
})
export class AppModule {}
