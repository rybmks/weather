# Weather API

A service that provides weather information by city.

## Features

- Weather broadcasts by city
- Email subscriptions for daily or hourly weather updates

## Prerequisites

### Local Setup

- Node.js
- pnpm package manager
- PostgreSQL
- Redis

### Docker Setup

- Docker installed and running

## Getting Started

### 1. Prepare environment

- Install all prerequisites listed above
- Copy `.env-example` to `.env` and fill in your configuration values

### 2. Run the application

#### Using Docker

```bash
docker compose up -d
```

#### Localy

```bash
pnpm install
nest build
node dist/apps/weather/src/main.js
node dist/apps/scheduler/src/main.js
```
