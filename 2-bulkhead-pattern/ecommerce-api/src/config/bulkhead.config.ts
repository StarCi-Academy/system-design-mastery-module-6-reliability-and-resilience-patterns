import {
    registerAs,
} from "@nestjs/config"

export type BulkheadConfig = {
    historyConcurrencyLimit: number
    historyProcessingDelayMs: number
}

/**
 * Cấu hình Bulkhead cho luồng history — namespace `bulkhead`.
 * (EN: Bulkhead config for history flow — `bulkhead` namespace.)
 */
export default registerAs(
    "bulkhead",
    (): BulkheadConfig => ({
        historyConcurrencyLimit: Number(process.env.HISTORY_CONCURRENCY_LIMIT) || 2,
        historyProcessingDelayMs: Number(process.env.HISTORY_PROCESSING_DELAY_MS) || 5000,
    }),
)
