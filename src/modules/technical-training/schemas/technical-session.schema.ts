import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Industry, CEFRLevel } from '../types/training-enums';

@Schema({ timestamps: true })
export class TechnicalSession extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ enum: Industry, required: true })
    industry: Industry;

    @Prop({ enum: CEFRLevel, required: true })
    cefrLevel: CEFRLevel;

    @Prop()
    completedAt?: Date;
}

export const TechnicalSessionSchema = SchemaFactory.createForClass(TechnicalSession);

