import {
    Module 
} from "@nestjs/common"
import {
    ConfigModule,
} from "@nestjs/config"
import {
    appConfig,
    circuitBreakerConfig,
    inventoryConfig,
} from "./config"
import {
    GatewayController 
} from "./gateway.controller"
import {
    GatewayService 
} from "./gateway.service"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                appConfig,
                inventoryConfig,
                circuitBreakerConfig,
            ],
        }),
    ],
    controllers: [GatewayController],
    providers: [GatewayService],
})
export class AppModule {}
