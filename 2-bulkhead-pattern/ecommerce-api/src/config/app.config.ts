import {
    registerAs,
} from "@nestjs/config"

export type AppConfig = {
    port: number
}

/**
 * Cấu hình runtime Ecommerce API — namespace `app`.
 * (EN: Ecommerce API runtime config — `app` namespace.)
 */
export default registerAs(
    "app",
    (): AppConfig => ({
        port: Number(process.env.PORT) || 3000,
    }),
)
