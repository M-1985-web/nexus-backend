import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AnyBulkWriteOperation } from 'mongodb';

// Schemas
import { TechnicalTerm } from './schemas/technical-term.schema';
import { TechnicalSession } from './schemas/technical-session.schema';
import { TechnicalExercise } from './schemas/technical-exercise.schema';
import { TechnicalAnswer } from './schemas/technical-answer.schema';
import { TechnicalFeedback } from './schemas/technical-feedback.schema';

// DTOs & Types
import { StartSessionDto } from './dto/start-session.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { Industry } from './types/training-enums';

// Adapters & Logic
import { LlmEvaluatorAdapter } from './adapters/llm-evaluator.adapter';
import { AdaptationLogic } from './logic/adaptation.logic';

// Seed Data
import { IT_EXERCISES_SEED } from './seeds/it-data.seed';

@Injectable()
export class TechnicalTrainingService {
    constructor(
        @InjectModel(TechnicalTerm.name) private termModel: Model<TechnicalTerm>,
        @InjectModel(TechnicalSession.name) private sessionModel: Model<TechnicalSession>,
        @InjectModel(TechnicalExercise.name) private exerciseModel: Model<TechnicalExercise>,
        @InjectModel(TechnicalAnswer.name) private answerModel: Model<TechnicalAnswer>,
        @InjectModel(TechnicalFeedback.name) private feedbackModel: Model<TechnicalFeedback>,
        private llmAdapter: LlmEvaluatorAdapter,
    ) { }

    // 1. Inicia la sesión
    async createSession(dto: StartSessionDto) {
        return await this.sessionModel.create({
            ...dto,
            userId: dto.userId || 'guest_user'
        });
    }

    // 2. Obtiene términos del diccionario
    async getTermsByIndustry(industry: Industry) {
        return await this.termModel.find({ industry }).exec();
    }

    // 3. Obtiene ejercicios dinámicos
    async getExercisesBySession(sessionId: string) {
        const session = await this.sessionModel.findById(sessionId).exec();
        if (!session) throw new NotFoundException('Session not found');

        return await this.exerciseModel.find({
            industry: session.industry
        }).exec();
    }

    // 4. Envía respuesta, evalúa con IA y aplica Adaptabilidad
    async submitAnswer(dto: SubmitAnswerDto) {
        const exercise = await this.exerciseModel.findById(dto.exerciseId).exec();
        if (!exercise) throw new NotFoundException('Exercise not found');

        // Creamos la respuesta (Guardamos los IDs como ObjectIDs reales)
        const answer = await this.answerModel.create({
            sessionId: new Types.ObjectId(dto.sessionId),
            exerciseId: new Types.ObjectId(dto.exerciseId),
            userInput: dto.userInput || '',
            audioUrl: dto.audioUrl,
        });

        const evaluation = await this.llmAdapter.evaluate({
            answer: dto.userInput || '',
            context: exercise.contextType,
            industry: exercise.industry,
            term: exercise.prompt
        });

        const feedback = await this.feedbackModel.create({
            answerId: answer._id,
            ...evaluation
        });

        const decision = AdaptationLogic.calculateDecision(evaluation);

        // ACTUALIZACIÓN CRÍTICA: Aseguramos el guardado del score numérico
        await this.answerModel.findByIdAndUpdate(
            answer._id,
            {
                $set: {
                    isEvaluated: true,
                    score: Number(decision.readinessScore) // Forzamos tipo número
                }
            },
            { new: true }
        ).exec();

        return {
            feedback,
            decision
        };
    }

    // 5. Calcula el progreso de la sesión
    async getSessionProgress(sessionId: string) {
        const session = await this.sessionModel.findById(sessionId).exec();
        if (!session) throw new NotFoundException('Session not found');

        // Filtramos ejercicios por industria
        const totalExercises = await this.exerciseModel.countDocuments({
            industry: session.industry
        }).exec();

        // MEJORA: Filtro más robusto para encontrar respuestas aprobadas
        const masteredAnswers = await this.answerModel.countDocuments({
            sessionId: new Types.ObjectId(sessionId),
            isEvaluated: true,
            score: { $gte: 7 } // Umbral de aprobación
        }).exec();

        const percentage = totalExercises > 0
            ? Math.round((masteredAnswers / totalExercises) * 100)
            : 0;

        return {
            totalExercises,
            completedExercises: masteredAnswers,
            progressPercentage: percentage,
            isReadyForInterview: percentage >= 80,
            industry: session.industry
        };
    }

    // 6. Seed de ejercicios
    async seedExercises() {
        const operations: AnyBulkWriteOperation<any>[] = IT_EXERCISES_SEED.map(exercise => ({
            updateOne: {
                filter: { prompt: exercise.prompt, industry: exercise.industry },
                update: { $set: exercise },
                upsert: true
            }
        }));

        const result = await this.exerciseModel.bulkWrite(operations);

        return {
            message: 'Database seeded successfully',
            upserted: result.upsertedCount,
            modified: result.modifiedCount,
            totalInSeed: IT_EXERCISES_SEED.length
        };
    }
}