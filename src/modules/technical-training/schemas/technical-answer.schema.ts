import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class TechnicalAnswer extends Document {
    @Prop({ type: Types.ObjectId, ref: 'TechnicalSession', required: true })
    sessionId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'TechnicalExercise', required: true })
    exerciseId: Types.ObjectId;

    @Prop({ required: false })
    userInput: string;

    @Prop({ required: false })
    audioUrl: string; // Dejado listo para Fase 2 (Speech-to-Text)

    @Prop({ type: Boolean, default: false })
    isEvaluated: boolean;

    // 🚀 CAMBIO CRÍTICO: Añadimos el campo score para persistir la evaluación de la IA
    @Prop({ type: Number, default: 0 })
    score: number;
}

export const TechnicalAnswerSchema = SchemaFactory.createForClass(TechnicalAnswer);