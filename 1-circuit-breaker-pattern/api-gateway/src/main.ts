import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

/**
 * Khởi chạy API Gateway (EN: bootstrap API Gateway)
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  // Gateway chạy ở port 3000 (EN: gateway runs on port 3000)
  await app.listen(3000)
}

bootstrap()
