import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { InglesModule } from './ingles/ingles.module';

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
        
        // LOG DE SEGURIDAD: Esto imprimirá en tu terminal la ruta que está usando
        console.log('--- INTENTO DE CONEXIÓN NEXUS ---');
        console.log('URI Detectada:', uri ? 'CARGADA CORRECTAMENTE' : 'ERROR: URI VACÍA');
        console.log('---------------------------------');

        return {
          uri: uri,
          // Forzamos el nombre de la DB aquí para evitar que se pierda en el limbo
          dbName: 'nexusdb', 
        };
      },
    }),

    AuthModule,

    InglesModule,
  ],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('🚀 Protocolo Nexus: Módulo Principal Inicializado');
  }
}
