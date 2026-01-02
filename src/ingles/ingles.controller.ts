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

  // --- NUEVO ENDPOINT: Validar respuesta ---
  @Post('answer')
  @ApiOperation({ summary: 'Valida la respuesta del usuario para una pregunta' })
  @ApiBody({ 
    schema: { 
      type: 'object', 
      properties: { 
        questionId: { type: 'string', example: '65e1...' }, 
        userAnswer: { type: 'string', example: 'am' } 
      } 
    } 
  })
  async check(
    @Body('questionId') questionId: string,
    @Body('userAnswer') userAnswer: string
  ) {
    // Llama a la función del servicio que corregimos anteriormente
    return this.inglesService.checkAnswer(questionId, userAnswer);
  }
}