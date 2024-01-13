import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  desc: string;
}
