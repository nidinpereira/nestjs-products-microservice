import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productsProviders } from './products.provider';
import { ProductReviewsService } from '../product-reviews/product-reviews.service';
import { productReviewsProviders } from '../product-reviews/product-reviews.provider';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'GATEWAY_CLIENT',
        transport: Transport.TCP,
        options: {
          host: process.env.TRANSPORT_URL_API_GATEWAY,
          port: parseInt(process.env.TRANSPORT_PORT_API_GATEWAY),
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ...productsProviders,
    ProductReviewsService,
    ...productReviewsProviders,
  ],
})
export class ProductsModule {}
