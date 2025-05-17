-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('DAILY', 'HOURLY');

-- CreateTable
CREATE TABLE "subscription" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "confirmation_token" TEXT NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscription_confirmation_token_key" ON "subscription"("confirmation_token");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_email_city_key" ON "subscription"("email", "city");
