import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Konfigurasi CORS
    const corsOptions: CorsOptions = {
      origin: true, // Mengizinkan hanya ke react
      methods: ['GET'], // Metode yang diizinkan
      allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };
    app.enableCors(corsOptions);

  await app.listen(3001);
}
bootstrap();
