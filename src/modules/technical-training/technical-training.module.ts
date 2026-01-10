import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TechnicalTrainingController } from './technical-training.controller';
import { TechnicalTrainingService } from './technical-training.service';
import { TechnicalTerm, TechnicalTermSchema } from './schemas/technical-term.schema';
import { TechnicalSession, TechnicalSessionSchema } from './schemas/technical-session.schema';

@Module({
    imports: [
        // Registramos el esquema en el módulo para que el Service pueda usarlo
        MongooseModule.forFeature([
            { name: TechnicalTerm.name, schema: TechnicalTermSchema },
            { name: TechnicalSession.name, schema: TechnicalSessionSchema } // 👈 Añade esto
        ]),
    ],
    controllers: [TechnicalTrainingController],
    providers: [TechnicalTrainingService],
    // Exportamos el servicio por si otros módulos (como el de Perfil) necesitan el score de readiness
    exports: [TechnicalTrainingService],
})
export class TechnicalTrainingModule { }