import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class GetCityWeatherDTO {
    @IsString({ message: 'City must be a string' })
    @IsNotEmpty({ message: 'City required' })
    @MinLength(1, { message: 'City cannot be empty' })
    city!: string;
}