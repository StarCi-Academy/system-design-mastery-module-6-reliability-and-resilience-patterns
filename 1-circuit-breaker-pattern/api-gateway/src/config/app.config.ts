import {
    registerAs,
} from "@nestjs/config"

export type AppConfig = {
    port: number
}

/**
 * Cấu hình runtime API Gateway — namespace `app`.
 * (EN: API Gateway runtime config — `app` namespace.)
 */
export default registerAs(
    "app",
    (): AppConfig => ({
        port: Number(process.env.PORT) || 3000,
    }),
)
