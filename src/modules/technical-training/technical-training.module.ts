import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TechnicalTrainingController } from './technical-training.controller';
import { TechnicalTrainingService } from './technical-training.service';

// Schemas
import { TechnicalTerm, TechnicalTermSchema } from './schemas/technical-term.schema';
import { TechnicalSession, TechnicalSessionSchema } from './schemas/technical-session.schema';
import { TechnicalExercise, TechnicalExerciseSchema } from './schemas/technical-exercise.schema';
import { TechnicalAnswer, TechnicalAnswerSchema } from './schemas/technical-answer.schema';
import { TechnicalFeedback, TechnicalFeedbackSchema } from './schemas/technical-feedback.schema';

// Adapters
import { LlmEvaluatorAdapter } from './adapters/llm-evaluator.adapter';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TechnicalTerm.name, schema: TechnicalTermSchema },
            { name: TechnicalSession.name, schema: TechnicalSessionSchema },
            { name: TechnicalExercise.name, schema: TechnicalExerciseSchema },
            { name: TechnicalAnswer.name, schema: TechnicalAnswerSchema },
            { name: TechnicalFeedback.name, schema: TechnicalFeedbackSchema },
        ]),
    ],
    controllers: [TechnicalTrainingController],
    providers: [
        TechnicalTrainingService,
        LlmEvaluatorAdapter // Inyectamos el adaptador para el "CTO Mode"
    ],
    exports: [TechnicalTrainingService],
})
export class TechnicalTrainingModule { }