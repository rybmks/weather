import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { SubscribeDto } from "./dto/subscribe.dto";
import { PrismaService } from "../../../../shared/prisma/prisma.service";
import { mapDtoToPrismaFrequency } from "shared/utils/map-frequency";
import { generate_confirmation_token } from "shared/utils/uuid-generate";
import { EmailService } from "shared/email/email.service";

@Injectable()
export class SubscriptionService {
    private readonly logger = new Logger(SubscriptionService.name);

    constructor(private readonly prisma : PrismaService, private readonly email: EmailService) {}

    async subscribe(subscribe: SubscribeDto) {
        const confirmation_token = generate_confirmation_token();
        if (await this.prisma.subscription.findFirst({ 
            where: { 
                email: subscribe.email, 
                city: subscribe.city,
            } 
          })){
            let message = `Subscription for ${subscribe.email} and city ${subscribe.city} is already exists!`
            
            this.logger.error(message);
            throw new ConflictException(message);
        }
        
        await this.prisma.subscription.create({
            data: {
                email: subscribe.email,
                city: subscribe.city,
                frequency: mapDtoToPrismaFrequency[subscribe.frequency],
                confirmation_token: confirmation_token,
                is_confirmed: false,
            }
        })

        await this.email.sendConfirmationMail(subscribe.email, confirmation_token);
    }

    async confirm(token: string) {
        await this.prisma.subscription.update({
            where: {
                confirmation_token: token
            },
            data: {
                is_confirmed: true
            }
        });
    }

    async unsubscribe(token: string){
        await this.prisma.subscription.delete({
            where: {
                confirmation_token: token
            }
        });
    }
}