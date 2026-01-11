import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class SubmitAnswerDto {
    @IsMongoId()
    @IsNotEmpty()
    sessionId: string;

    @IsMongoId()
    @IsNotEmpty()
    exerciseId: string;

    @IsString()
    @IsOptional()
    userInput?: string;

    @IsString()
    @IsOptional()
    audioUrl?: string; // Listo para Fase 2
}