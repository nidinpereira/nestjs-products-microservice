import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REVIEW_MODEL } from '../../constants/providers.constants';
import { Model } from 'mongoose';
import { ProductReview } from './interfaces/product-review.interface';
import { CreateProductReviewDto } from './dtos/create-product-review.dto';
import { UpdateProductReviewDto } from './dtos/update-product-review.dto';

@Injectable()
export class ProductReviewsService {
  constructor(
    @Inject(PRODUCT_REVIEW_MODEL)
    private productReviewModel: Model<ProductReview>,
  ) {}

  async create(
    createProductReviewDto: CreateProductReviewDto,
  ): Promise<ProductReview> {
    const createdProduct = new this.productReviewModel(createProductReviewDto);
    await createdProduct.save();
    return createdProduct;
  }

  async findAll(query: any, limit = 0, sort?): Promise<ProductReview[]> {
    return this.productReviewModel.find(query).limit(limit).sort(sort).exec();
  }

  async findById(id: string): Promise<ProductReview> {
    return this.productReviewModel.findOne({ _id: id }).exec();
  }

  async findOne(query: any): Promise<ProductReview> {
    return this.productReviewModel.findOne({ ...query }).exec();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductReviewDto,
  ): Promise<ProductReview> {
    return this.productReviewModel.findByIdAndUpdate(id, updateProductDto);
  }

  async delete(id: string): Promise<any> {
    return this.productReviewModel.findByIdAndDelete(id).exec();
  }
}
