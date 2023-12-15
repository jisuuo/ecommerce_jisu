import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  //Product 생성 로직
  async createdProduct(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepo.create(createProductDto);
    await this.productRepo.save(newProduct);
    return newProduct;
  }
  //Product 가져오는 로직
  async getProducts() {
    const products = await this.productRepo.find();
    return products;
  }

  //상세 Product 가져오는 로직
  async getProductById(productId: string) {
    const product = await this.productRepo.findOneBy({ id: productId });
    if (product) return product;
    throw new HttpException('No Product', HttpStatus.NOT_FOUND);
  }

  //Product 전체 삭제하는 로직
  async deleteProducts() {
    await this.productRepo.clear();
    return 'Success';
  }

  //Product 상세 삭제하는 로직
  async deleteProductById(id: string) {
    const deleteRes = await this.productRepo.delete(id);
    if (!deleteRes.affected) {
      throw new HttpException('No Product', HttpStatus.NOT_FOUND);
    }
    return `Deleted at ${id}`;
  }

  //Product 상세 수정하는 로직
  async updateProductById(id: string, updateProductDto: CreateProductDto) {
    await this.productRepo.update(id, updateProductDto);
    const updateProduct = await this.productRepo.findOneBy({ id });
    if (updateProduct) return updateProduct;
    throw new HttpException('No Product', HttpStatus.NOT_FOUND);
  }
}
