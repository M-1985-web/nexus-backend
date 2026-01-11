import { EvaluationResult } from '../adapters/llm-evaluator.adapter';

export enum TrainingAction {
    ADVANCE = 'ADVANCE',      // El usuario dominó el término
    REPEAT = 'REPEAT',       // El usuario cometió errores graves, debe reintentar
    REINFORCE = 'REINFORCE'  // Aprobó pero con sugerencias de mejora
}

export interface AdaptationDecision {
    action: TrainingAction;
    nextStep: string;
    readinessScore: number;
}

export class AdaptationLogic {
    // Umbrales de decisión
    private static readonly PASS_THRESHOLD = 7;
    private static readonly REPEAT_THRESHOLD = 4;

    static calculateDecision(evaluation: EvaluationResult): AdaptationDecision {
        // Calculamos un promedio ponderado (Accuracy pesa más que Clarity)
        const weightedScore = (
            evaluation.accuracyScore * 0.5 +
            evaluation.clarityScore * 0.3 +
            evaluation.professionalismScore * 0.2
        );

        let action: TrainingAction;
        let nextStep: string;

        if (weightedScore >= this.PASS_THRESHOLD) {
            action = TrainingAction.ADVANCE;
            nextStep = 'Term mastered. Moving to the next challenge.';
        } else if (weightedScore <= this.REPEAT_THRESHOLD) {
            action = TrainingAction.REPEAT;
            nextStep = 'The technical concept is not clear. Please try the same exercise again.';
        } else {
            action = TrainingAction.REINFORCE;
            nextStep = 'Good attempt, but let’s try a similar term to reinforce.';
        }

        return {
            action,
            nextStep,
            readinessScore: weightedScore
        };
    }
}