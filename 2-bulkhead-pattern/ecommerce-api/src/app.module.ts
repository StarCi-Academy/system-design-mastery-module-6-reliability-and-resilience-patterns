import { Module } from "@nestjs/common"
import {
    ConfigModule,
} from "@nestjs/config"
import {
    appConfig,
    bulkheadConfig,
} from "./config"
import { EcommerceController } from "./ecommerce.controller"
import { EcommerceService } from "./ecommerce.service"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                appConfig,
                bulkheadConfig,
            ],
        }),
    ],
    controllers: [EcommerceController],
    providers: [EcommerceService],
})
export class AppModule {}
