import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ProductReviewsController } from './product-reviews.controller';
import { ProductReviewsService } from './product-reviews.service';
import { productReviewsProviders } from './product-reviews.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductReviewsController],
  providers: [ProductReviewsService, ...productReviewsProviders],
})
export class ProductReviewsModule {}
