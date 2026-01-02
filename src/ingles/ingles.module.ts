import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InglesService } from './ingles.service';
import { InglesController } from './ingles.controller';
import { Question, QuestionSchema } from '../ingles/schemas/question.schema'; // Ruta actualizada

@Module({
  imports: [
    // Registro del modelo en el módulo correspondiente
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }])
  ],
  controllers: [InglesController],
  providers: [InglesService],
})
export class InglesModule {}