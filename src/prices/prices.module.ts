import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prices } from './entities/prices.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Prices]), ProductsModule],
  controllers: [PricesController],
  providers: [PricesService],
})
export class PricesModule {}
