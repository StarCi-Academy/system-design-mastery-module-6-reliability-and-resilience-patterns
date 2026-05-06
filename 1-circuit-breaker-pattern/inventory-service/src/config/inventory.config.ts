import {
    registerAs,
} from "@nestjs/config"

export type InventoryBehaviorConfig = {
    failureAfterSuccessCount: number
}

/**
 * Cấu hình hành vi giả lập lỗi của Inventory Service — namespace `inventory`.
 * (EN: Inventory Service simulated failure behavior config — `inventory` namespace.)
 */
export default registerAs(
    "inventory",
    (): InventoryBehaviorConfig => ({
        failureAfterSuccessCount: Number(process.env.FAILURE_AFTER_SUCCESS_COUNT) || 3,
    }),
)
