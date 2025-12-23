import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Nexus & Real-Time API')
    .setDescription('Protocolo de emparejamiento de talento técnico internacional')
    .setVersion('1.0')
    .addTag('auth')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Esta será tu URL de docs

  await app.listen(3000);
  console.log(`🚀 Nexus Backend corriendo en: http://localhost:3000/api/docs`);
}
bootstrap();
