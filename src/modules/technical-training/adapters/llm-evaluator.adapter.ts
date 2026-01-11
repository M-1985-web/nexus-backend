import { Injectable } from '@nestjs/common';

export interface EvaluationResult {
    accuracyScore: number;
    clarityScore: number;
    professionalismScore: number;
    correctedVersion: string;
    optimizedVersion: string;
    practicalTip: string;
}

@Injectable()
export class LlmEvaluatorAdapter {

    // El "Core" del pensamiento del CTO
    private readonly SYSTEM_PROMPT = `
        Act as a Senior Technical Lead (CTO). 
        Context: {context} in the {industry} industry.
        Target Term: {term}

        Evaluate the developer's answer based on:
        1. Technical Accuracy (1-10): Correct use of "{term}".
        2. Clarity (1-10): Clear communication for a technical team.
        3. Professionalism (1-10): Senior tone, avoiding vague words like "stuff" or "things".

        Output ONLY a JSON object.
    `;

    async evaluate(payload: {
        answer: string;
        term: string;
        context: string;
        industry: string;
    }): Promise<EvaluationResult> {

        // Reemplazo dinámico de variables para el log de auditoría
        const fullPrompt = this.SYSTEM_PROMPT
            .replace('{context}', payload.context)
            .replace('{industry}', payload.industry)
            .replace('{term}', payload.term);

        console.log('--- [CTO MODE] Prompt Ready ---');
        console.log(fullPrompt);

        // Simulamos la respuesta de la IA (Fase de Mock hasta conectar API Key)
        // Pero ya usamos los datos reales del payload para que el feedback sea coherente
        return {
            accuracyScore: 8,
            clarityScore: 7,
            professionalismScore: 9,
            correctedVersion: `Your answer about ${payload.term} is grammatically correct.`,
            optimizedVersion: `In a ${payload.industry} ${payload.context}, you should say: 'We leveraged ${payload.term} to optimize the workflow'.`,
            practicalTip: `Avoid vague language. Instead of explaining '${payload.term}' generally, mention its impact on the ${payload.industry} stack.`,
        };
    }
}