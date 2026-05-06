import { Module } from "@nestjs/common"
import {
    ConfigModule,
} from "@nestjs/config"
import { TerminusModule } from "@nestjs/terminus"
import {
    appConfig,
    healthConfig,
} from "./config"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                appConfig,
                healthConfig,
            ],
        }),
        TerminusModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
