import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  //crea la aplicación
  const app = await NestFactory.create(AppModule);

  // --- ESTA ES LA LÍNEA CLAVE ---
  app.enableCors(); 
  // ------------------------------

  //El truco del "Whitelisting"
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Nexus & Real-Time API')
    .setDescription('Protocolo de talento técnico IT internacional')
    .setVersion('1.0')
    .addTag('auth')
    .build();
    
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Esta será tu URL de docs

  await app.listen(3000);
  console.log(`🚀 Nexus Backend corriendo en: http://localhost:3000/api/docs`);

  
}
bootstrap();

