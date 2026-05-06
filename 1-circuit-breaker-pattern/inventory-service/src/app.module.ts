import { Module } from "@nestjs/common"
import {
    ConfigModule,
} from "@nestjs/config"
import {
    appConfig,
    inventoryConfig,
} from "./config"
import { InventoryController } from "./inventory.controller"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                appConfig,
                inventoryConfig,
            ],
        }),
    ],
    controllers: [InventoryController],
})
export class AppModule {}
