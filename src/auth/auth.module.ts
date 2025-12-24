import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
// Fíjate bien: un punto sale de 'auth', el segundo punto asegura estar en 'src'
import { Talento, TalentoSchema } from '../talento/schemas/talento.schema'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Talento.name, schema: TalentoSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
/*
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
*/