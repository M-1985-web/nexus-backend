import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TechnicalTrainingService } from './technical-training.service';
import { Industry } from './types/training-enums';
import { StartSessionDto } from './dto/start-session.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto'; // ✅ Importación añadida


@ApiTags('Technical Training')
@Controller('technical-training')
export class TechnicalTrainingController {
    constructor(private readonly technicalTrainingService: TechnicalTrainingService) { }

    @Post('session')
    @ApiOperation({
        summary: 'Inicia una nueva sesión y la persiste en DB',
        description: 'Crea un registro de sesión para rastrear el progreso del talento.'
    })
    @ApiResponse({ status: 201, description: 'Sesión creada exitosamente.' })
    async startSession(@Body() dto: StartSessionDto) {
        // Asegúrate de que en el Service el método se llame "createSession"
        const session = await this.technicalTrainingService.createSession(dto);

        return {
            message: 'Protocolo de entrenamiento iniciado',
            sessionId: (session as any)._id, // Casteo simple para evitar quejas de tipos de Mongo
            data: session
        };
    }

    @Get('dictionary/:industry')
    @ApiOperation({ summary: 'Obtener términos por industria' })
    async getDictionary(@Param('industry') industry: Industry) {
        return this.technicalTrainingService.getTermsByIndustry(industry);
    }

    @Get('session/:id/exercises') // ✅ Añadido el endpoint que nos faltaba para el flujo
    @ApiOperation({ summary: 'Obtiene los ejercicios generados para una sesión' })
    async getExercises(@Param('id') sessionId: string) {
        return this.technicalTrainingService.getExercisesBySession(sessionId);
    }

    @Post('answer')
    @ApiOperation({ summary: 'Envía una respuesta y recibe feedback del CTO' })
    async submitAnswer(@Body() dto: SubmitAnswerDto) {
        return this.technicalTrainingService.submitAnswer(dto);
    }

    @Get('session/:id/progress')
    @ApiOperation({ summary: 'Obtiene el % de progreso y readiness de la sesión' })
    async getProgress(@Param('id') sessionId: string) {
        return this.technicalTrainingService.getSessionProgress(sessionId);
    }

    @Post('admin/seed-exercises')
    @ApiOperation({
        summary: 'Puebla la base de datos con ejercicios reales',
        description: 'Carga ejercicios base para la industria IT si no existen.'
    })
    async seedExercises() {
        return this.technicalTrainingService.seedExercises();
    }
}