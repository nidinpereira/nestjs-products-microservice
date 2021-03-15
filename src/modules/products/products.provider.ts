import { Connection } from 'mongoose';
import { ProductSchema } from './schemas/product.schema';
import {
  MONGO_DATABASE_CONNECTION,
  PRODUCT_MODEL,
} from '../../constants/providers.constants';

export const productsProviders = [
  {
    provide: PRODUCT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Product', ProductSchema),
    inject: [MONGO_DATABASE_CONNECTION],
  },
];
