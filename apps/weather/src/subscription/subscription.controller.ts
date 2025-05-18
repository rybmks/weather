import { Body, Controller, Post, Param, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { SubscribeDto } from "./dto/subscribe.dto";
import { SubscriptionService } from "./subscription.service";

@Controller()
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) {}

    @Post("subscribe")
    @HttpCode(HttpStatus.OK)
    async subscribe(@Body() subscribe: SubscribeDto) {
        await this.subscriptionService.subscribe(subscribe);

        return {message: 'Subscription request received. Please confirm via email.' }
    }

    @Get('confirm/:token')
    @HttpCode(HttpStatus.OK)
    async confirm(@Param('token') token: string) {
        await this.subscriptionService.confirm(token);

        return { message: 'Subscription confirmed successfully.' }
    }

    @Get('unsubscribe/:token')
    @HttpCode(HttpStatus.OK)
    async unsubscribe(@Param('token') token: string) {
        await this.subscriptionService.unsubscribe(token);

        return { message: 'You have been unsubscribed from weather updates.' }
    }
}