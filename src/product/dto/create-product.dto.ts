import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  // 필수값, 이메일 밸리데이션
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @MinLength(10)
  @ApiProperty()
  desc: string;

  @ApiProperty()
  price?: number;

  @ApiProperty()
  onSales?: boolean;
}
