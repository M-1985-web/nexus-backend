// src/comunicacion/schemas/communication-practice.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommunicationPracticeDocument = CommunicationPractice & Document;

@Schema({ timestamps: true }) // Crea automáticamente createdAt y updatedAt
export class CommunicationPractice {

    @Prop({ type: Types.ObjectId, ref: 'Talento', required: true })
    talentoId: Types.ObjectId;

    @Prop({
        required: true,
        enum: ['SOFT_SKILLS', 'CV_PRACTICE', 'ELEVATOR_PITCH']
    })
    type: string;

    @Prop({ required: true })
    prompt: string; // La pregunta o reto que le puso la IA

    @Prop({ required: true })
    userResponse: string; // Lo que el usuario escribió o dijo

    @Prop({ type: Object }) // Objeto con el feedback detallado de la IA
    evaluation: {
        fluency: number;
        grammar: number;
        tone: string;
        feedback: string;
        optimizedVersion: string;
        suggestions: string[];
    };

    @Prop({ required: true })
    cefrLevelAtTime: string; // El nivel que tenía el usuario (A1, B2...) en ese momento
}

export const CommunicationPracticeSchema = SchemaFactory.createForClass(CommunicationPractice);