/**
 * Khởi tạo Nest app client-service — ValidationPipe toàn cục và lắng nghe cổng.
 * (EN: Bootstrap Nest client-service — global ValidationPipe and listen on port.)
 */
import {
    ValidationPipe,
} from "@nestjs/common"
import {
    NestFactory,
} from "@nestjs/core"
import {
    AppModule,
} from "./app.module"

export async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidUnknownValues: false,
        }),
    )
    const port = Number(process.env.PORT) || 3000
    // Cổng: biến môi trường PORT hoặc 3000.
    // (EN: Port from env PORT or default 3000.)
    await app.listen(
        port,
        // Lắng nghe trên mọi interface để container/docker map được cổng.
        // (EN: Listen on all interfaces so Docker/port mapping works.)
        "0.0.0.0",
    )
}
