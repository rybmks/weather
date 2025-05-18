import { Frequency as PrismaFrequency } from '@prisma/client';
import { Frequency as DtoFrequency } from 'shared/types/frequency.enum'; 

export const mapDtoToPrismaFrequency: Record<DtoFrequency, PrismaFrequency> = {
  [DtoFrequency.DAILY]: PrismaFrequency.DAILY,
  [DtoFrequency.HOURLY]: PrismaFrequency.HOURLY,
};
