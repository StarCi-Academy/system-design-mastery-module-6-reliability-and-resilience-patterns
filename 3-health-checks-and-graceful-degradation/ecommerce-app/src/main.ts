import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

/**
 * Khởi chạy Ecommerce App với Health Checks (EN: bootstrap Ecommerce App with Health Checks)
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  // App chạy ở port 3000 (EN: app runs on port 3000)
  await app.listen(3000)
}

bootstrap()
