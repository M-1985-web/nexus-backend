import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Question extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ 
    enum: ['multiple_choice', 'fill_blank', 'reading', 'writing'], 
    required: true 
  })
  type: string;

  @Prop({ 
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], 
    required: true 
  })
  level: string;

  @Prop([String]) 
  options: string[];

  @Prop({ required: true }) // <--- Asegúrate de que esta línea esté aquí
  correctAnswer: string;

  @Prop() 
  contextText?: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);