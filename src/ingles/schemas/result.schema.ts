import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Result extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Talento', required: true })
  talentoId: Types.ObjectId;

  @Prop({ required: true })
  level: string;

  @Prop()
  description: string;

  @Prop([String])
  strengths: string[];

  @Prop([String])
  weaknesses: string[];

  @Prop({ type: Object })
  rawScore: { correct: number; total: number };
}

export const ResultSchema = SchemaFactory.createForClass(Result);