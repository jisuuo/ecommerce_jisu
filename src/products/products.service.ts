import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdatePriceDto } from '../prices/dto/update-price.dto';
import e from 'express';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  // 상품 생성 api
  async createProduct(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create(createProductDto);
    const newProduct = await this.productRepository.save(product);
    return newProduct;
  }

  // 특정 상품 조회 api
  async getProductById(productId: string) {
    const product = await this.productRepository.findOne({
      relations: {
        reviews: true,
        prices: true,
      },
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }
    return product;
  }

  // 상품 전체 조회 api
  async getAllProducts() {
    const products = await this.productRepository.find({
      relations: {
        reviews: true,
        prices: true,
      },
    });
    if (products) return products;
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  // 특정 상품 수정 api
  async updateProductById(
    productId: string,
    updateProductDto?: UpdateProductDto,
  ) {
    const product = await this.productRepository.findOneBy({
      id: productId,
    });

    if (product.onSales) {
      product.onSales = updateProductDto.onSales;
    }

    if (product.productCode) {
      product.productCode = updateProductDto.productCode;
    }

    if (product.productName) {
      product.productName = updateProductDto.productName;
    }

    if (product.brand) {
      product.brand = updateProductDto.brand;
    }

    if (product.gender) {
      product.gender = updateProductDto.gender;
    }

    if (product.prices) {
      product.prices = updateProductDto.price;
    }

    if (product.season) {
      product.season = updateProductDto.season;
    }

    const updateProduct = await this.productRepository.save(product);
    return updateProduct;
  }

  // 특정 상품 삭제 api
  async deleteProduct(id: string) {
    await this.productRepository.delete(id);
    return 'Delete Success';
  }

  // 상품 전체 삭제 api
  async deleteAllProducts() {
    await this.productRepository.clear();
    return 'Delete All Success';
  }

  async resetPrice(productId: string) {
    const product = await this.productRepository.findOneBy({
      id: productId,
    });

    product.prices.nonMembers = 0;
    product.prices.members = 0;
    const resetPrice = await this.productRepository.save(product);
    return resetPrice;
  }

  // 상품 가격 수정
  async updatePrice(productId: string, updatePriceDto: UpdatePriceDto) {
    const product = await this.productRepository.findOneBy({
      id: productId,
    });

    if (product.prices && updatePriceDto.nonMembers) {
      product.prices.nonMembers = updatePriceDto.nonMembers;
    }

    if (product.prices && updatePriceDto.members) {
      product.prices.nonMembers = updatePriceDto.members;
    }

    const updateProduct = await this.productRepository.save(product);
    return updateProduct;
  }
}
