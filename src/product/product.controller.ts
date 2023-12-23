import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //Product Data 생성 api
  @Post('create')
  async createdProduct(
    // @Body('name') name: string,
    // @Body('desc') desc: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return await this.productService.createdProduct(createProductDto);
  }
  //Product Data 전체 불러오기 api
  @Get('all')
  async getProducts() {
    return await this.productService.getProducts();
  }
  //Product 상세 데이터 불러오기 api (By id)
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }
  //Product Data 상세 데이터 수정 api(By id)
  @Patch(':id')
  async updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return await this.productService.updateProductById(id, updateProductDto);
  }
  //Product Data 전체 삭제 api
  @Delete()
  async deleteProducts() {
    return await this.productService.deleteProducts();
  }
  //Product 상세 데이터 삭제 api(By id)
  @Delete(':id')
  async deleteProductById(@Param('id') id: string) {
    return await this.productService.deleteProductById(id);
  }
}
