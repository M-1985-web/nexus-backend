import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; // NUEVO: Importación para habilitar JWT
import { Talento, TalentoSchema } from '../talento/schemas/talento.schema'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Talento.name, schema: TalentoSchema }]),
    
    // NUEVO: Configuración del módulo de Tokens
    JwtModule.register({
      global: true, // Lo hace disponible en todo el proyecto
      secret: 'PROTOCOLO_NEXUS_2025_SECRET_KEY', // Esta es la firma de seguridad
      signOptions: { expiresIn: '1h' }, // El acceso expira en 1 hora
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
