// src/comunicacion/dto/create-practice-answer.dto.ts
import { IsString, IsNotEmpty, IsEnum, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // 👈 Importante

export enum PracticeType {
    SOFT_SKILLS = 'SOFT_SKILLS',
    CV_PRACTICE = 'CV_PRACTICE',
    ELEVATOR_PITCH = 'ELEVATOR_PITCH'
}

export class CreatePracticeAnswerDto {

    @ApiProperty({ example: '659af...' }) // 👈 Añade esto a cada campo
    @IsMongoId()
    @IsNotEmpty()
    talentoId: string;

    @ApiProperty({ enum: PracticeType })
    @IsEnum(PracticeType)
    @IsNotEmpty()
    type: PracticeType;

    @ApiProperty({ example: 'Tell me about yourself' })
    @IsString()
    @IsNotEmpty()
    prompt: string;

    @ApiProperty({ example: 'I am a software developer with experience in React...' })
    @IsString()
    @IsNotEmpty()
    userResponse: string;

    @ApiProperty({ example: 'B1' })
    @IsString()
    @IsNotEmpty()
    cefrLevelAtTime: string;
}