import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

/**
 * Khởi chạy Ecommerce API (EN: bootstrap Ecommerce API)
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  // App chạy ở port 3000 (EN: app runs on port 3000)
  await app.listen(3000)
}

bootstrap()
