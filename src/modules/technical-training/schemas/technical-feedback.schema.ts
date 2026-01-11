import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class TechnicalFeedback extends Document {
    @Prop({ type: Types.ObjectId, ref: 'TechnicalAnswer', required: true })
    answerId: Types.ObjectId;

    @Prop({ required: true })
    accuracyScore: number; // 1-10 (Precisión técnica)

    @Prop({ required: true })
    clarityScore: number; // 1-10 (Claridad comunicativa)

    @Prop({ required: true })
    professionalismScore: number; // 1-10 (Tono CTO/Senior)

    @Prop()
    correctedVersion: string; // Versión corregida gramaticalmente

    @Prop()
    optimizedVersion: string; // Versión "Senior" sugerida

    @Prop()
    practicalTip: string; // El consejo directo del CTO
}

export const TechnicalFeedbackSchema = SchemaFactory.createForClass(TechnicalFeedback);