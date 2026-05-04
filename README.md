# system-design-mastery-module-6-reliability-and-resilience-patterns

NestJS demo repository for reliability and resilience patterns.

## Lessons

- `0-failures-in-distributed-systems`: Order/Payment + Docker chaos with Pumba.
- `1-timeouts-and-retries`: Client/Bank timeout with exponential backoff + jitter.
- `2-circuit-breaker-pattern`: API Gateway + Inventory with Opossum circuit breaker.
- `3-bulkhead-pattern`: Route-level resource isolation with concurrency limiter.
- `4-health-checks-and-graceful-degradation`: Terminus health checks + graceful degradation.

## Quick start by lesson

### 0-failures-in-distributed-systems

```bash
docker network create starci-network
docker compose up -d order-service payment-service
docker compose up -d pumba-chaos
```

### 1-timeouts-and-retries

```bash
cd bank-service && npm install && npm run start:dev
cd ../client-service && npm install && npm run start:dev
```

### 2-circuit-breaker-pattern

```bash
cd inventory-service && npm install && npm run start:dev
cd ../api-gateway && npm install && npm run start:dev
```

### 3-bulkhead-pattern

```bash
cd ecommerce-api && npm install && npm run start:dev
```

### 4-health-checks-and-graceful-degradation

```bash
cd ecommerce-app && npm install && npm run start:dev
```
