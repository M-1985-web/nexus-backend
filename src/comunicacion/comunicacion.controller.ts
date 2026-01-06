// src/comunicacion/comunicacion.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger'; // Importa esto
import { ComunicacionService } from './comunicacion.service';
import { CreatePracticeAnswerDto } from './dto/create-practice-answer.dto';

@ApiTags('Comunicacion') // Organiza el endpoint en Swagger
@Controller('comunicacion')
export class ComunicacionController {
  constructor(private readonly comunicacionService: ComunicacionService) { }

  @Post('process-answer')
  @ApiOperation({ summary: 'Procesar respuesta de práctica con IA' })
  async processAnswer(@Body() createPracticeAnswerDto: CreatePracticeAnswerDto) {
    return this.comunicacionService.evaluateAndSave(createPracticeAnswerDto);
  }
}