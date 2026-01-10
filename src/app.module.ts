import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { InglesModule } from './ingles/ingles.module';
import { ComunicacionModule } from './comunicacion/comunicacion.module';
// 1. IMPORTA EL NUEVO MÓDULO AQUÍ
import { TechnicalTrainingModule } from './modules/technical-training/technical-training.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');

        console.log('--- INTENTO DE CONEXIÓN NEXUS ---');
        console.log('URI Detectada:', uri ? 'CARGADA CORRECTAMENTE' : 'ERROR: URI VACÍA');
        console.log('---------------------------------');

        return {
          uri: uri,
          dbName: 'nexusdb',
        };
      },
    }),

    AuthModule,
    InglesModule,
    ComunicacionModule,
    // 2. REGÍSTRALO AQUÍ
    TechnicalTrainingModule,
  ],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('🚀 Protocolo Nexus: Módulo Principal Inicializado');
  }
}