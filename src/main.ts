import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Gaming Collection')
    .setDescription('Gaming Collection description')
    .setVersion('0.1')
    .build()

    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('api',app,document);

    await app.listen(4000);
}
bootstrap();
