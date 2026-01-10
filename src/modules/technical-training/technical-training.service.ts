// src/modules/technical-training/technical-training.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TechnicalTerm } from './schemas/technical-term.schema';
import { TechnicalSession } from './schemas/technical-session.schema'; // [MOD] Importación del nuevo esquema de sesión
import { Industry, CEFRLevel } from './types/training-enums';
import { StartSessionDto } from './dto/start-session.dto'; // [MOD] Importación del DTO para tipado

@Injectable()
export class TechnicalTrainingService implements OnModuleInit {
    constructor(
        @InjectModel(TechnicalTerm.name) private termModel: Model<TechnicalTerm>,
        @InjectModel(TechnicalSession.name) private sessionModel: Model<TechnicalSession>, // [MOD] Inyección del modelo de Sesión
    ) { }

    // Este método se ejecuta automáticamente cuando arranca el servidor
    async onModuleInit() {
        const count = await this.termModel.countDocuments();
        if (count === 0) {
            console.log('🌱 Iniciando carga de términos técnicos (Seed)...');
            await this.seedTerms();
        }
    }

    /**
     * [MOD] Crea una nueva sesión de entrenamiento y la persiste en MongoDB
     * @param dto Datos del usuario, industria y nivel
     * @returns El objeto de la sesión creada con su _id
     */
    async createSession(dto: StartSessionDto): Promise<TechnicalSession> {
        const newSession = new this.sessionModel(dto);
        return newSession.save();
    }

    // Obtiene términos del diccionario filtrados por industria
    async getTermsByIndustry(industry: Industry) {
        return this.termModel.find({ industry }).exec();
    }

    // Carga inicial de datos de prueba
    private async seedTerms() {
        const terms = [
            {
                term: 'Deploy',
                industry: Industry.IT,
                definitionSimple: 'To put a new version of software into use.',
                definitionProfessional: 'The process of delivering a finished software version to a production environment.',
                exampleSentence: 'We are ready to deploy the new update to the production server.',
                cefrMinLevel: CEFRLevel.B1,
                relatedTerms: ['Release', 'Rollout'],
                confusingWith: ['Build']
            },
            {
                term: 'Scalability',
                industry: Industry.CLOUD,
                definitionSimple: 'The ability of a system to grow.',
                definitionProfessional: 'The measure of a system’s ability to increase or decrease in performance and cost in response to changes in application and system processing demands.',
                exampleSentence: 'Cloud computing provides the scalability needed for rapid growth.',
                cefrMinLevel: CEFRLevel.B2,
                relatedTerms: ['Elasticity', 'High Availability'],
                confusingWith: ['Flexibility']
            }
        ];

        await this.termModel.insertMany(terms);
        console.log('✅ Seed finalizado: 2 términos cargados.');
    }
}