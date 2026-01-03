import { Controller, Post, Get, Query, Body, Param } from '@nestjs/common';
import { InglesService } from './ingles.service';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('Ingles') // Agrupa los endpoints en la interfaz de Swagger
@Controller('ingles')
export class InglesController {
  constructor(private readonly inglesService: InglesService) {}

  @Post('seed')
  @ApiOperation({ summary: 'Carga el banco de preguntas inicial' })
  async seed() {
    await this.inglesService.seedQuestions();
    return { message: 'Banco de preguntas cargado con éxito' };
  }

  @Get('next')
  @ApiOperation({ summary: 'Obtiene una pregunta aleatoria según el nivel' })
  @ApiQuery({ name: 'level', enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], required: false })
  async getNext(@Query('level') level: string) {
    const targetLevel = level || 'A2';
    const question = await this.inglesService.getNextQuestion(targetLevel);
    
    if (!question) {
      return { message: `No hay preguntas para el nivel ${targetLevel}` };
    }
    
    return question;
  }

  @Post('answer')
  @ApiOperation({ summary: 'Valida la respuesta del usuario para una pregunta' })
  @ApiBody({ 
    schema: { 
      type: 'object', 
      properties: { 
        questionId: { type: 'string', example: '6776e6a88b5066601b50030d' }, 
        userAnswer: { type: 'string', example: 'am' } 
      } 
    } 
  })
  async check(
    @Body('questionId') questionId: string,
    @Body('userAnswer') userAnswer: string
  ) {
    return this.inglesService.checkAnswer(questionId, userAnswer);
  }

  // --- CAMBIO PRINCIPAL: Se agregó ApiBody para habilitar el cuadro de texto en Swagger ---
  @Post('finish')
  @ApiOperation({ summary: 'Finaliza el test y calcula el nivel final' })
  @ApiBody({ 
    schema: { 
      type: 'object', 
      properties: { 
        talentoId: { type: 'string', example: '12345' }, 
        respuestasCorrectas: { type: 'number', example: 4 }, 
        totalPreguntas: { type: 'number', example: 5 } 
      } 
    } 
  })
  async finishTest(@Body() data: { talentoId: string, respuestasCorrectas: number, totalPreguntas: number }) {
    // Se corrigió el nombre de la propiedad 'totalPreguntas' que estaba truncado
    return this.inglesService.calculateFinalResult(data);
  }

  @Get('result/:talentoId')
  @ApiOperation({ summary: 'Obtiene el último resultado guardado de un talento' })
  async getResult(@Param('talentoId') talentoId: string) {
    // Llama a la función que agregamos al servicio para limpiar el error TS
    return this.inglesService.getStoredResult(talentoId);
  }
}