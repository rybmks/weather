import { IsNotEmpty, IsString, MinLength, IsEmail, IsEnum } from 'class-validator';
import { Frequency } from 'shared/types/frequency.enum';

export class SubscribeDto {
    @IsString({ message: 'City must be a string' })
    @IsNotEmpty({ message: 'City required' })
    @MinLength(1, { message: 'City cannot be empty' })
    city!: string;

    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email!: string

    @IsEnum(Frequency, { message: 'Frequency must be one of: ' + Object.values(Frequency).join(', ') })
    frequency!: Frequency
}
