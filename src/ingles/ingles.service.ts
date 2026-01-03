import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Question } from '../ingles/schemas/question.schema'; 
import { Result } from '../ingles/schemas/result.schema'; 
// Importamos la clase Talento para el tipado
import { Talento } from '../talento/schemas/talento.schema';

@Injectable()
export class InglesService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel(Result.name) private resultModel: Model<Result>,
    // Inyectamos el modelo de Talento para realizar la actualización
    @InjectModel(Talento.name) private talentoModel: Model<Talento>,
  ) {}

  // --- MÉTODOS EXISTENTES (Seed, Next, Check) ---

  async seedQuestions() {
    const questions = [
      { text: 'I ___ from Spain.', type: 'multiple_choice', level: 'A1', options: ['am', 'is', 'are', 'be'], correctAnswer: 'am' },
      { text: 'She ___ to the gym every Saturday.', type: 'multiple_choice', level: 'A2', options: ['go', 'goes', 'going', 'gone'], correctAnswer: 'goes' },
      { text: 'The flight was ___ because of the heavy rain.', type: 'fill_blank', level: 'B1', correctAnswer: 'delayed' },
      { text: 'What is the main advantage of remote work mentioned in the text?', type: 'reading', level: 'B2', contextText: 'Remote work allows employees to balance their personal lives while maintaining high productivity levels...', options: ['Higher pay', 'Work-life balance', 'Free coffee', 'Office equipment'], correctAnswer: 'Work-life balance' },
      { text: 'The CEO’s decision was ___ with a lot of criticism from the board.', type: 'multiple_choice', level: 'C1', options: ['met', 'found', 'seen', 'taken'], correctAnswer: 'met' }
    ];
    await this.questionModel.deleteMany({});
    return this.questionModel.insertMany(questions);
  }

  async getNextQuestion(level: string) {
    const questions = await this.questionModel.find({ level }).exec();
    if (questions.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }

  async checkAnswer(questionId: string, userAnswer: string) {
    const question = await this.questionModel.findById(questionId).exec();
    if (!question) throw new Error('Pregunta no encontrada');
    const isCorrect = question.correctAnswer.toLowerCase() === userAnswer.toLowerCase();
    return { isCorrect, correctAnswer: isCorrect ? null : question.correctAnswer };
  }

  // --- MÉTODO ACTUALIZADO: Finalizar y Sincronizar con Perfil ---
  async calculateFinalResult(data: { talentoId: string, respuestasCorrectas: number, totalPreguntas: number }) {
    const { talentoId, respuestasCorrectas, totalPreguntas } = data;
    const porcentaje = (respuestasCorrectas / totalPreguntas) * 100;

    // Lógica de asignación de niveles Nexus
    let level = 'A1';
    let description = 'Beginner';
    if (porcentaje >= 90) { level = 'C1'; description = 'Advanced'; }
    else if (porcentaje >= 70) { level = 'B2'; description = 'Upper Intermediate'; }
    else if (porcentaje >= 50) { level = 'B1'; description = 'Intermediate'; }

    // 1. Guardar el resultado histórico en la colección 'results'
    const newResult = new this.resultModel({
      talentoId: new Types.ObjectId(talentoId),
      level,
      description,
      rawScore: { correct: respuestasCorrectas, total: totalPreguntas },
      date: new Date()
    });
    const savedResult = await newResult.save();

    // 2. CAMBIO CLAVE: Actualización automática del perfil del Talento
    // Se utiliza findByIdAndUpdate para reflejar el nivel obtenido en el documento principal
    await this.talentoModel.findByIdAndUpdate(
      talentoId,
      { englishLevel: level }, // Actualiza el campo englishLevel en MongoDB Atlas
      { new: true } // Retorna el documento actualizado
    );

    return {
      message: "Test finalizado y perfil actualizado con éxito",
      resultId: savedResult._id,
      level,
      description,
      updatedProfile: true
    };
  }

  async getStoredResult(talentoId: string) {
    return this.resultModel.findOne({ talentoId: new Types.ObjectId(talentoId) }).sort({ createdAt: -1 }).exec(); //caso borde solo para entendidos jajjaja
  }
}