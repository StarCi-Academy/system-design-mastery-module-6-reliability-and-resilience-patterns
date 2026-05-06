/**
 * Khởi tạo Nest app bank-service — lắng nghe cổng 3001 (giả lập dịch vụ ngân hàng chậm).
 * (EN: Bootstrap Nest bank-service — listen on port 3001 (simulated slow bank service).)
 */
import {
    NestFactory,
} from "@nestjs/core"
import {
    AppModule,
} from "./app.module"

export async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    const port = Number(process.env.PORT) || 3001
    // Cổng: biến môi trường PORT hoặc 3001.
    // (EN: Port from env PORT or default 3001.)
    await app.listen(
        port,
        // Lắng nghe trên mọi interface để container/docker map được cổng.
        // (EN: Listen on all interfaces so Docker/port mapping works.)
        "0.0.0.0",
    )
}
