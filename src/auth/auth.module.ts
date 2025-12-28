import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importamos estas dos
import { Talento, TalentoSchema } from '../talento/schemas/talento.schema'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Talento.name, schema: TalentoSchema }]),
    
    // MODIFICADO: Ahora el JwtModule se registra de forma asíncrona para leer el .env
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'), // <-- Lee la clave del .env
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }






