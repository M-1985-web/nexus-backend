import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TechnicalTrainingService } from './technical-training.service';
import { Industry } from './types/training-enums';
import { StartSessionDto } from './dto/start-session.dto'; // [MOD] Importación del DTO real

@ApiTags('Technical Training')
@Controller('technical-training')
export class TechnicalTrainingController {
    constructor(private readonly technicalTrainingService: TechnicalTrainingService) { }

    @Post('session')
    @ApiOperation({
        summary: 'Inicia una nueva sesión y la persiste en DB',
        description: 'Crea un registro de sesión para rastrear el progreso del talento en una industria específica.'
    })
    @ApiResponse({ status: 201, description: 'Sesión creada exitosamente.' })
    async startSession(@Body() dto: StartSessionDto) {
        // [MOD] Ahora llamamos al servicio para persistir la sesión en MongoDB
        const session = await this.technicalTrainingService.createSession(dto);

        // [MOD] Retornamos el sessionId (_id de Mongo) para que el Frontend lo use en las respuestas
        return {
            message: 'Protocolo de entrenamiento iniciado',
            sessionId: session._id,
            data: session
        };
    }

    @Get('dictionary/:industry')
    @ApiOperation({ summary: 'Obtener términos por industria' })
    @ApiResponse({ status: 200, description: 'Lista de términos técnicos de la industria seleccionada.' })
    async getDictionary(@Param('industry') industry: Industry) {
        return this.technicalTrainingService.getTermsByIndustry(industry);
    }
}

