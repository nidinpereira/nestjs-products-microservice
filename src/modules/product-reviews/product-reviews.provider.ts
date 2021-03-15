import { Connection } from 'mongoose';
import { ProductReviewSchema } from './schemas/product-review.schema';
import {
  MONGO_DATABASE_CONNECTION,
  PRODUCT_REVIEW_MODEL,
} from '../../constants/providers.constants';

export const productReviewsProviders = [
  {
    provide: PRODUCT_REVIEW_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('ProductReview', ProductReviewSchema),
    inject: [MONGO_DATABASE_CONNECTION],
  },
];
