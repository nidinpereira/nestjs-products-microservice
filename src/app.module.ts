import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { ProductReviewsModule } from './modules/product-reviews/product-reviews.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule, ProductReviewsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
