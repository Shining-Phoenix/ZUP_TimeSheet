import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .addBearerAuth(  { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',)
    .setTitle('TimeKeeper')
    .setDescription('Удаленное рабочее место табельщика 1С: ЗУП')
    .setVersion('0.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
