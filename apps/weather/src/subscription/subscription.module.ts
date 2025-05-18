import { Module } from "@nestjs/common";
import { SubscriptionController } from "./subscription.controller";
import { SubscriptionService } from "./subscription.service";
import { PrismaModule as PrismaModule } from "../../../../shared/prisma/prisma.module";
import { EmailModule } from "shared/email/email.module";

@Module({
    imports: [PrismaModule, EmailModule],
    controllers: [SubscriptionController],
    providers: [SubscriptionService]  
})
export class SubscriptionModule {}