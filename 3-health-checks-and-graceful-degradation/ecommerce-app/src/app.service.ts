import { Injectable } from "@nestjs/common"

@Injectable()
export class AppService {
  // Mảng lưu trữ các khối bộ nhớ để giả lập rò rỉ/tăng tải (EN: array to store memory blocks to simulate leakage/stress)
  private memoryBlocks: Buffer[] = []

  /**
   * Tăng tải bộ nhớ bằng cách cấp phát thêm 50MB (EN: stress memory by allocating an additional 50MB)
   *
   * @returns { status: string; message: string; blocks: number } - Trạng thái cấp phát (EN: Allocation status)
   */
  stressMemory() {
    // Cấp phát khối bộ nhớ 50MB (EN: allocate 50MB memory block)
    const block = Buffer.alloc(50 * 1024 * 1024, "a")

    // Lưu vào mảng để không bị GC thu hồi (EN: store in array to prevent GC collection)
    this.memoryBlocks.push(block)

    // Trả về thông tin hiện tại (EN: return current information)
    return {
      status: "success",
      message: "Allocated 50MB memory block",
      blocks: this.memoryBlocks.length,
    }
  }

  /**
   * Lấy danh sách sản phẩm với cơ chế Graceful Degradation
   * (EN: get products list with Graceful Degradation mechanism)
   *
   * @returns { status: string; message?: string; data: any[] } - Danh sách sản phẩm (EN: Product list)
   */
  products() {
    // Tính toán lượng RAM đang sử dụng tính theo MB (EN: calculate current RAM usage in MB)
    const usedMb = process.memoryUsage().heapUsed / 1024 / 1024

    // Kiểm tra nếu bộ nhớ vượt quá ngưỡng 120MB (EN: check if memory usage exceeds 120MB threshold)
    if (usedMb > 120) {
      // Thực hiện Graceful Degradation: tắt tính năng AI tốn tài nguyên (EN: perform Graceful Degradation: disable resource-intensive AI feature)
      return {
        status: "degraded",
        message: "System is overloaded. AI Suggestion feature is temporarily disabled.",
        data: [
          { id: 1, name: "Default Product A" },
          { id: 2, name: "Default Product B" },
        ],
      }
    }

    // Trả về dữ liệu đầy đủ tính năng khi hệ thống ổn định (EN: return full-featured data when system is stable)
    return {
      status: "success",
      data: [
        { id: 1, name: "AI Suggestion - Premium Product" },
        { id: 2, name: "AI Suggestion - Popular Product" },
      ],
    }
  }
}
