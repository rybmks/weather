import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { SubscribeDto } from "./dto/subscribe.dto";
import { PrismaService } from "../../../../shared/prisma/prisma.service";
import { mapDtoToPrismaFrequency } from "shared/utils/map-frequency";
import { EmailService } from "shared/email/email.service";
import { SharedWeatherService } from "shared/weather/weather.service";
import { Prisma } from "@prisma/client";
import { generate_confirmation_token } from "shared/utils/confirmation_token-generate";

@Injectable()
export class SubscriptionService {
    private readonly logger = new Logger(SubscriptionService.name);

    constructor(private readonly prisma : PrismaService, private readonly emailService: EmailService, private readonly weatherService: SharedWeatherService) {}

    async subscribe(subscribe: SubscribeDto) {
        try {
            let _response = await this.weatherService.getWeather(subscribe.city);
        }
        catch (error) {
            if (error.response?.status === 400 && error.response?.data?.error?.code === 1006) {
                let message = `Data for ${subscribe.city} city not found.`
                
                this.logger.error(message);
                throw new NotFoundException(message);
            }

            throw error
        }          

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

        const confirmation_token = generate_confirmation_token();

        await this.prisma.subscription.create({
            data: {
                email: subscribe.email,
                city: subscribe.city,
                frequency: mapDtoToPrismaFrequency[subscribe.frequency],
                confirmation_token: confirmation_token,
                is_confirmed: false,
            }
        })

        await this.emailService.sendConfirmationMail(subscribe.email, confirmation_token);
    }

    async confirm(token: string) {
        if (!token || token.trim().length < 3) {
            throw new BadRequestException("Invalid token");
        }
       
        try {
            await this.prisma.subscription.update({
                where: {
                    confirmation_token: token
                },
                data: {
                    is_confirmed: true
                }
            });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    let message = `Subscription with ${token} token not found.`

                    this.logger.error(message);
                    throw new NotFoundException(message);
                }
              }

              this.logger.error(`Error: ${error.message}`)
              throw error;
        }
    }

    async unsubscribe(token: string){
        if (!token || token.trim().length < 3) {
            throw new BadRequestException("Invalid token");
        }
        
        try {
            await this.prisma.subscription.delete({
                where: {
                    confirmation_token: token
                }
            });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    let message = `Subscription with ${token} token not found.`

                    this.logger.error(message);
                    throw new NotFoundException(message);
                }
              }

              this.logger.error(`Error: ${error.message}`)
              throw error;
        }

    }
}