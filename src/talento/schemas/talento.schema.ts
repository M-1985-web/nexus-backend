import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Esto agrega automáticamente fecha de creación y actualización
export class Talento extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'TALENTO_PENDIENTE' })
  status: string;
}

export const TalentoSchema = SchemaFactory.createForClass(Talento);