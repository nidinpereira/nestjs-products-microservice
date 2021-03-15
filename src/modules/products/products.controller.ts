import { Body, Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './interfaces/product.interface';
import { ProductReviewsService } from '../product-reviews/product-reviews.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productReviewsService: ProductReviewsService,
  ) {}

  @MessagePattern({ resource: 'products', cmd: 'post' })
  async create(@Body() createProductDto: CreateProductDto) {
    const [existingProduct] = await Promise.all([
      this.productsService.findOne({
        brand: createProductDto.brand,
        name: createProductDto.name,
      }),
    ]);

    if (existingProduct) {
      throw new RpcException('Product Exists for the selected Brand');
    }

    return this.productsService.create(createProductDto);
  }

  @MessagePattern({ resource: 'products', cmd: 'getAll' })
  async findAll(): Promise<any[]> {
    const products = await this.productsService.findAll();

    return Promise.all(
      products.map(async (productDocument) => {
        const product = productDocument.toObject();
        product.reviews = await this.productReviewsService.findAll(
          {
            productId: product._id.toString(),
          },
          3,
          { _id: -1 },
        );
        return product;
      }),
    );
  }

  @MessagePattern({ resource: 'products', cmd: 'getOne' })
  async findOne(data: any): Promise<Product> {
    const product = await this.productsService.findById({ ...data });
    if (!product) {
      throw new RpcException('Not Found');
    }
    return product;
  }

  @MessagePattern({ resource: 'products', cmd: 'update' })
  async update(data): Promise<Product> {
    const product = await this.productsService.findById(data._id);
    if (!product) {
      throw new RpcException('Not Found');
    }

    await this.productsService.update(data._id, { ...data });
    return this.productsService.findById(data._id);
  }

  @MessagePattern({ resource: 'products', cmd: 'delete' })
  async delete(data): Promise<string> {
    const product = await this.productsService.findById(data._id);
    if (!product) {
      throw new RpcException('Not Found');
    }
    await this.productsService.delete(data._id);
    return 'success';
  }
}
