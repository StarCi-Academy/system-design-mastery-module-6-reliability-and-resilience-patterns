import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

/**
 * Khởi chạy Inventory Service (EN: bootstrap Inventory Service)
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  // Service chạy ở port 3001 (EN: service runs on port 3001)
  await app.listen(3001)
}

bootstrap()
