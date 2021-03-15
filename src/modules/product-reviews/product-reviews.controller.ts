import {
  Body,
  Controller,
  NotFoundException,
} from '@nestjs/common';
import { ProductReviewsService } from './product-reviews.service';
import { CreateProductReviewDto } from './dtos/create-product-review.dto';
import { ProductReview } from './interfaces/product-review.interface';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @MessagePattern({ resource: 'product-reviews', cmd: 'post' })
  async create(@Body() createProductReviewDto: CreateProductReviewDto) {
    const [existingProductReview] = await Promise.all([
      this.productReviewsService.findOne({
        userId: createProductReviewDto.userId,
        productId: createProductReviewDto.productId,
      }),
    ]);

    if (existingProductReview) {
      throw new RpcException('Review for product exists');
    }

    return this.productReviewsService.create(createProductReviewDto);
  }

  @MessagePattern({ resource: 'product-reviews', cmd: 'getAll' })
  async findAll(data): Promise<ProductReview[]> {
    return this.productReviewsService.findAll(data.query, data.limit, data.sort);
  }

  @MessagePattern({ resource: 'product-reviews', cmd: 'getOne' })
  async findOne(data: any): Promise<ProductReview> {
    const productReview = await this.productReviewsService.findById(data._id);
    if (!productReview) {
      throw new RpcException('Not Found');
    }
    return productReview;
  }

  @MessagePattern({ resource: 'product-reviews', cmd: 'update' })
  async update(data): Promise<ProductReview> {
    const productReview = await this.productReviewsService.findById(data._id);
    if (!productReview) {
      throw new RpcException('Not Found');
    }

    await this.productReviewsService.update(data._id, { ...data });
    return this.productReviewsService.findById(data._id);
  }

  @MessagePattern({ resource: 'product-reviews', cmd: 'delete' })
  async delete(data): Promise<string> {
    const productReview = await this.productReviewsService.findById(data._id);
    if (!productReview) {
      throw new RpcException('Not Found');
    }
    await this.productReviewsService.delete(data._id);
    return 'success';
  }
}
