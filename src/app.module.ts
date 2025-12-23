//typeScript

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Asegúrate de haber hecho: npm install @nestjs/config
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Esto le dice a Nest que busque el archivo .env
    MongooseModule.forRoot(process.env.MONGO_URI || ''), AuthModule, // Esto usa la variable que creamos
    //Esto le asegura a NestJS que siempre recibirá al menos un texto vacío si falla la carga del archivo .env.

    // Aquí se agregarán los módulos de la aplicación (AuthModule, PruebasModule, etc.)
  ],

  controllers: [],

  providers: [],

})

export class AppModule {}
