import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Basement Monitoring API')
    .setDescription('OpenAPI specification and Swagger documentation for the Basement Monitoring system')
    .setVersion('1.0')
    .addTag('App', 'General endpoints')
    .addTag('Basement', 'Basement management endpoints')
    .addTag('Line', 'Line management endpoints')
    .addTag('Line In Out Basement', 'Line in/out basement mapping endpoints')
    .addTag('Incr Red Line', 'Increment/Reduce line configuration endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation available at: http://localhost:${port}/api/docs`);
}
await bootstrap();
