import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InglesService } from './ingles.service';
import { InglesController } from './ingles.controller';

// Importamos los esquemas propios del módulo
import { Question, QuestionSchema } from '../ingles/schemas/question.schema'; 
import { Result, ResultSchema } from '../ingles/schemas/result.schema'; 

// IMPORTANTE: Importamos el esquema de Talento para permitir el "Update" automático
import { Talento, TalentoSchema } from '../talento/schemas/talento.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      // Registro de preguntas y resultados históricos
      { name: Question.name, schema: QuestionSchema },
      { name: Result.name, schema: ResultSchema },
      
      // Registro del modelo de Talento para que el service pueda usar 'this.talentoModel'
      { name: Talento.name, schema: TalentoSchema }
    ])
  ],
  controllers: [InglesController],
  providers: [InglesService],
  // Exportamos el servicio para que otros módulos (como Talento) puedan usar sus funciones
  exports: [InglesService] 
})
export class InglesModule { }

