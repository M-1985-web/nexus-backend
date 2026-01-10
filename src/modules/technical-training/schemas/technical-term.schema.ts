//Este es el "corazón" del conocimiento técnico por industria

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Industry, CEFRLevel } from '../types/training-enums';

@Schema({ timestamps: true })
export class TechnicalTerm extends Document {
    @Prop({ required: true })
    term: string;

    @Prop({ enum: Industry, required: true })
    industry: Industry;

    @Prop()
    definitionSimple: string;

    @Prop()
    definitionProfessional: string;

    @Prop()
    exampleSentence: string;

    @Prop({ enum: CEFRLevel })
    cefrMinLevel: CEFRLevel;

    @Prop([String])
    relatedTerms: string[];

    @Prop([String])
    confusingWith: string[];
}

export const TechnicalTermSchema = SchemaFactory.createForClass(TechnicalTerm);