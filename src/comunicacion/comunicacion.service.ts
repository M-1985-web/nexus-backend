import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommunicationPractice, CommunicationPracticeDocument } from './schemas/communication-practice.schema';
import { CreatePracticeAnswerDto } from './dto/create-practice-answer.dto';
// Importa aquí tu servicio de OpenAI o LLM que ya tengas configurado
//import { OpenAiService } from '../ai/openai.service'; 

@Injectable()
export class ComunicacionService {
  constructor(
    @InjectModel(CommunicationPractice.name)
    private practiceModel: Model<CommunicationPracticeDocument>,
    // private aiService: OpenAiService 
  ) { }

  async evaluateAndSave(dto: CreatePracticeAnswerDto) {
    // 1. Preparamos el Prompt para la IA (Ingeniería de Prompts Nexus)
    const promptSystem = `
      Actúa como un Coach de Inglés Profesional para la plataforma Nexus.
      El usuario tiene un nivel CEFR ${dto.cefrLevelAtTime}.
      Analiza la siguiente respuesta basada en el reto: "${dto.prompt}".
      
      Respuesta del usuario: "${dto.userResponse}"
      
      Debes devolver un JSON estrictamente con esta estructura:
      {
        "fluency": (número 1-10),
        "grammar": (número 1-10),
        "tone": "professional/casual/anxious",
        "feedback": "una frase motivadora y correctiva corta",
        "optimizedVersion": "una versión de la respuesta un nivel superior al del usuario",
        "suggestions": ["tip 1", "tip 2"]
      }
    `;

    // 2. Llamada a la IA (Simulada aquí, debes conectar tu OpenAI/Anthropic)
    // const aiResult = await this.aiService.getCompletion(promptSystem);
    const mockAiResult = {
      fluency: 7,
      grammar: 8,
      tone: "professional",
      feedback: "Buena estructura, pero podrías usar conectores más avanzados.",
      optimizedVersion: "I currently work on cybersecurity tasks, focusing primarily on incident prevention.",
      suggestions: ["Usa 'focus on' en lugar de 'work with'", "Añade conectores como 'Furthermore'"]
    };

    // 3. Guardamos en MongoDB Atlas
    const newPractice = new this.practiceModel({
      ...dto,
      evaluation: mockAiResult,
    });

    return await newPractice.save();
  }

  async getHistory(talentoId: string) {
    return this.practiceModel.find({ talentoId }).sort({ createdAt: -1 }).exec();
  }
}