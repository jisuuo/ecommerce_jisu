import { GenderEnum } from '../../enum/gender.enum';
import { Prices } from '../../prices/entities/prices.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty()
  productName?: string;

  @ApiProperty()
  brand?: string;

  @ApiProperty()
  productCode?: string;

  @ApiProperty()
  season?: string;

  @ApiProperty()
  gender?: GenderEnum;

  @ApiProperty()
  price?: Prices;

  @ApiProperty()
  onSales?: boolean;
}
