import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import { WeatherApiResponse } from "shared/weather/interfaces/weater-response.interface";

@Injectable()
export class EmailService {
    private transporter: nodemailer.transporter;

    constructor() {
        this.transporterFromEnv();
    }

    private transporterFromEnv() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, 
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASSWORD,
            },
          });
    }

    async sendConfirmationMail(email: string, token: string) {
        const confirmUrl = `${process.env.APP_URL}/api/confirm/${token}`;
    
        await this.transporter.sendMail({
          from: `"Weather App" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Please confirm your subscription",
          html: `
            <h3>Thank you for subscribing to weather updates!</h3>
            <p>Please confirm your email by clicking the link below:</p>
            <a href="${confirmUrl}">Confirm Subscription</a>
          `,
        });
      }

      async sendWeatherUpdate(email: string, city: string, token: string, weatherInfo: WeatherApiResponse) {
        const unsubscribeUrl = `${process.env.APP_URL}/api/unsubscribe/${email}`;
    
        await this.transporter.sendMail({
          from: `"Weather App" <${process.env.SMTP_USER}>`,
          to: email,
          subject: `Weather update for ${city}`,
          html: `
            <h3>Current Weather in ${city}</h3>
            <p>Temperature: ${weatherInfo.temperature}°C</p>
            <p>Humidity: ${weatherInfo.humidity}</p>
            <p>Short weather description: ${weatherInfo.description}</p>
            <p><a href="${unsubscribeUrl}">Unsubscribe</a></p>
          `,
        });
      }
}