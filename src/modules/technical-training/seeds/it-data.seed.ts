import { Industry, ExerciseType, ContextType } from '../types/training-enums';

export const IT_EXERCISES_SEED = [
    {
        industry: Industry.IT,
        // Cambiamos a EXPLANATION para que coincida con la tarea de explicar
        type: ExerciseType.EXPLANATION,
        prompt: 'Explain what a "Middleware" is in the context of a web server.',
        contextType: ContextType.MEETING, // Usamos el Enum para evitar errores
        difficulty: 'Intermediate'
    },
    {
        industry: Industry.IT,
        type: ExerciseType.EXPLANATION,
        prompt: 'How would you describe "Scalability" to a non-technical stakeholder?',
        contextType: ContextType.MEETING,
        difficulty: 'Advanced'
    },
    {
        industry: Industry.IT,
        type: ExerciseType.EXPLANATION,
        prompt: 'What is the purpose of "Dependency Injection" in modern frameworks?',
        contextType: ContextType.CODE_REVIEW,
        difficulty: 'Intermediate'
    }
];

