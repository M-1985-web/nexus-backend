// Estos aseguran que el frontend y el backend hablen el mismo idioma

export enum Industry {
  IT = 'IT',
  SECURITY = 'Security',
  CLOUD = 'Cloud',
  LEGAL = 'Legal',
}

export enum CEFRLevel {
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
}

export enum ContextType {
  STANDUP = 'standup',
  DOCUMENTATION = 'documentation',
  CODE_REVIEW = 'code_review',
  MEETING = 'meeting',
  INTERVIEW = 'interview', // Añadido para el Seed de IT
  TECH_TALK = 'tech_talk',  // Añadido para el Seed de IT
}

export enum ExerciseType {
  MULTIPLE_CHOICE = 'multiple_choice',
  SHORT_ANSWER = 'short_answer', // Usamos este para el Seed
  EXPLANATION = 'explanation',
  SCENARIO = 'scenario',
}