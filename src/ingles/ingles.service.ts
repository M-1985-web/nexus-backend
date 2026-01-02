import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from '../ingles/schemas/question.schema'; //

@Injectable()
export class InglesService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>, //
  ) {}

  // --- CAMBIO 1: Método Seed (Mantenido y Limpiado) ---
  async seedQuestions() {
    const questions = [
      {
        text: 'I ___ from Spain.',
        type: 'multiple_choice',
        level: 'A1',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 'am',
      },
      {
        text: 'She ___ to the gym every Saturday.',
        type: 'multiple_choice',
        level: 'A2',
        options: ['go', 'goes', 'going', 'gone'],
        correctAnswer: 'goes',
      },
      {
        text: 'The flight was ___ because of the heavy rain.',
        type: 'fill_blank',
        level: 'B1',
        correctAnswer: 'delayed',
      },
      {
        text: 'What is the main advantage of remote work mentioned in the text?',
        type: 'reading',
        level: 'B2',
        contextText: 'Remote work allows employees to balance their personal lives while maintaining high productivity levels...',
        options: ['Higher pay', 'Work-life balance', 'Free coffee', 'Office equipment'],
        correctAnswer: 'Work-life balance',
      },
      {
        text: 'The CEO’s decision was ___ with a lot of criticism from the board.',
        type: 'multiple_choice',
        level: 'C1',
        options: ['met', 'found', 'seen', 'taken'],
        correctAnswer: 'met',
      }
    ];

    await this.questionModel.deleteMany({});
    return this.questionModel.insertMany(questions);
  }

  // --- CAMBIO 2: Obtener pregunta aleatoria por nivel ---
  // Esta función permite al front pedir "dame una de nivel B1"
  async getNextQuestion(level: string) {
    const questions = await this.questionModel.find({ level }).exec();
    if (questions.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }

  // --- CAMBIO 3: Validar respuesta del usuario ---
  // Compara el ID de la pregunta y la respuesta enviada para decidir si sube de nive
  async checkAnswer(questionId: string, userAnswer: string) {
    // Agregamos <Question> para ayudar a TypeScript
    const question = await this.questionModel.findById(questionId).exec();
    
    if (!question) {
      throw new Error('Pregunta no encontrada');
    }

    // Ahora TypeScript reconocerá .correctAnswer sin problemas
    const isCorrect = question.correctAnswer.toLowerCase() === userAnswer.toLowerCase();

    return {
      isCorrect,
      correctAnswer: isCorrect ? null : question.correctAnswer
    };
  }
}
