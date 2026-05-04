import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

/**
 * Hàm khởi chạy ứng dụng NestJS (EN: bootstrap function to start NestJS application)
 */
async function bootstrap(): Promise<void> {
  // Khởi tạo ứng dụng từ AppModule (EN: create application instance from AppModule)
  const app = await NestFactory.create(AppModule)

  // Lắng nghe trên cổng 3000 (EN: listen on port 3000)
  await app.listen(3000)
}

// Thực thi hàm bootstrap (EN: execute bootstrap function)
bootstrap()
