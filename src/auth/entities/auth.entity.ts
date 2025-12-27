import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Talento extends Document { // <--- Este nombre debe ser exacto
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const TalentoSchema = SchemaFactory.createForClass(Talento);
