import { Controller, Get } from "@nestjs/common"

/**
 * Hàm hỗ trợ dừng thực thi trong một khoảng thời gian
 * (EN: Helper function to pause execution for a given duration)
 *
 * @param ms - Thời gian chờ tính bằng mili giây (EN: wait time in milliseconds)
 * @returns Promise<void>
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

@Controller()
export class BankController {
  /**
   * Endpoint thực hiện chuyển khoản (Giả lập chậm trễ 10s)
   * (EN: endpoint to execute transfer - simulates 10s delay)
   *
   * @returns Promise<{ status: string }> - Trạng thái thành công (EN: Success status)
   */
  @Get("transfer")
  async transfer(): Promise<{ status: string }> {
    // Giả lập hệ thống xử lý chậm (EN: simulate slow processing system)
    await sleep(10000)

    // Trả về trạng thái thành công (EN: return success status)
    return {
      status: "success",
    }
  }
}
