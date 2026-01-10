import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { Industry, CEFRLevel } from '../types/training-enums';

export class StartSessionDto {
    @ApiProperty({ example: 'userId_123' })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ enum: Industry, example: Industry.IT })
    @IsEnum(Industry)
    industry: Industry;

    @ApiProperty({ enum: CEFRLevel, example: CEFRLevel.B2 })
    @IsEnum(CEFRLevel)
    cefrLevel: CEFRLevel;
}