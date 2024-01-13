import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  // 상품 생성 api
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  // 특정 상품 조회 api
  // like 상품이름으로 조회하고 싶을때는?
  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  // 상품 전체 조회 api
  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  // 특정 상품 수정 api
  @Patch('/update/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.updateProductById(id, updateProductDto);
  }

  // 특정 상품 삭제 api
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }

  // 상품 전체 삭제 api
  @Delete()
  async deleteAllProducts() {
    return await this.productService.deleteAllProducts();
  }
}
