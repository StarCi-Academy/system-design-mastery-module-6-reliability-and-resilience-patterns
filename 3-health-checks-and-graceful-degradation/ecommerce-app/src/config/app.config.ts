import {
    registerAs,
} from "@nestjs/config"

export type AppConfig = {
    port: number
}

/**
 * Cấu hình runtime chung của ứng dụng — namespace `app`.
 * (EN: Shared application runtime config — `app` namespace.)
 */
export default registerAs(
    "app",
    (): AppConfig => ({
        port: Number(process.env.PORT) || 3000,
    }),
)
