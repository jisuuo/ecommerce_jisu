import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prices } from './entities/prices.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(Prices)
    private readonly priceRepo: Repository<Prices>,
    private readonly productService: ProductsService,
  ) {}

  // price 생성 api
  async createPrices(id: string, createPriceDto: CreatePriceDto) {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }
    const newPrice = this.priceRepo.create({
      product: product,
      nonMembers: createPriceDto.nonMembers,
      members: createPriceDto.members,
    });
    await this.priceRepo.save(newPrice);
    return newPrice;
  }

  // 한 상품 건에 대한 price 조회 api
  async getPrice(id: string) {
    const product = await this.productService.getProductById(id);

    if (!product.prices) {
      throw new NotFoundException('해당 건에 대한 가격이 없습니다.');
    }
    return product.prices;
  }

  // 전체 상품 건에 대한 price 조회 api
  async getAllPrice() {
    const products = await this.productService.getAllProducts();
    return products.map((value) => value.prices);
  }

  // 특정 상품 가격 수정 api
  async updatePrice(id: string, updatePriceDto: UpdatePriceDto) {
    return await this.productService.updatePrice(id, updatePriceDto);
  }

  // 특정 상품 가격 삭제 api
  async resetPrice(id: string) {
    return await this.productService.resetPrice(id);
  }
}
