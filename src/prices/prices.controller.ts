import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('prices')
@ApiTags('Prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  // price 생성 api
  @Post(':id')
  async createPrices(
    @Param('id') id: string,
    @Body() createPriceDto: CreatePriceDto,
  ) {
    return await this.pricesService.createPrices(id, createPriceDto);
  }

  // 한 상품 건에 대한 price 조회 api
  @Get(':id')
  async getPrice(@Param('id') id: string) {
    return await this.pricesService.getPrice(id);
  }

  // 전체 상품 건에 대한 price 조회 api
  @Get()
  async getAllPrices() {
    return await this.pricesService.getAllPrice();
  }

  // 특정 상품 가격 수정 api
  @Patch('update/:id')
  async updatePrice(@Param('id') id: string, updatePriceDto: UpdatePriceDto) {
    return await this.pricesService.updatePrice(id, updatePriceDto);
  }

  // 특정 상품 가격 초기화 api
  @Delete('reset/:id')
  async resetPrice(@Param('id') id: string) {
    return await this.pricesService.resetPrice(id);
  }
}
