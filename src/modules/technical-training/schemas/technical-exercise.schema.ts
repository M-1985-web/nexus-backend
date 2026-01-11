import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Industry, CEFRLevel, ContextType, ExerciseType } from '../types/training-enums';

@Schema({ timestamps: true })
export class TechnicalExercise extends Document {
    @Prop({ type: String, enum: Industry, required: true })
    industry: Industry;

    @Prop({ type: String, enum: ContextType, required: true })
    contextType: ContextType;

    @Prop({ type: String, enum: ExerciseType, required: true })
    type: ExerciseType;

    @Prop({ required: true })
    prompt: string;

    @Prop({ type: [String], default: [] })
    options: string[];

    @Prop()
    correctAnswer?: string;

    @Prop({ type: String, enum: CEFRLevel, required: true })
    cefrLevel: CEFRLevel;

    @Prop({ type: [String], default: [] })
    relatedTermIds: string[];
}

export const TechnicalExerciseSchema = SchemaFactory.createForClass(TechnicalExercise);