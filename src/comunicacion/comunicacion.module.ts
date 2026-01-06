// src/comunicacion/comunicacion.module.ts
import { Module } from '@nestjs/common'; // Asegura esta importación
import { MongooseModule } from '@nestjs/mongoose';
import { ComunicacionController } from './comunicacion.controller';
import { ComunicacionService } from './comunicacion.service';
import { CommunicationPractice, CommunicationPracticeSchema } from './schemas/communication-practice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommunicationPractice.name, schema: CommunicationPracticeSchema }
    ])
  ],
  controllers: [ComunicacionController],
  providers: [ComunicacionService],
})
export class ComunicacionModule { }