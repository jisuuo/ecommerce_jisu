import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  desc: string;

  @ApiProperty()
  price?: number;

  @ApiProperty()
  onSales?: boolean;
}
