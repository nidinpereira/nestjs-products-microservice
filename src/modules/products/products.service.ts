import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_MODEL } from '../../constants/providers.constants';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_MODEL)
    private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    await createdProduct.save();
    return createdProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findOne({ _id: id }).exec();
  }

  async findOne(query: any): Promise<Product> {
    return this.productModel.findOne({ ...query }).exec();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async delete(id: string): Promise<any> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
