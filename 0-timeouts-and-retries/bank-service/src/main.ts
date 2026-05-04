import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

/**
 * Khởi chạy Bank Service (EN: bootstrap Bank Service)
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  // Service này chạy ở port 3001 (EN: this service runs on port 3001)
  await app.listen(3001)
}

bootstrap()
