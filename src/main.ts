import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: parseInt(process.env.TRANSPORT_PORT_PRODUCT_SERVICE),
    },
  });

  return app.listen(() => console.log(`Products Microservice on port: ${parseInt(
    process.env.TRANSPORT_PORT_PRODUCT_SERVICE,
    )}`
    ),
  );
}
bootstrap();
