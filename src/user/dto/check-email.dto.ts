import { ApiProperty } from '@nestjs/swagger';

export class CheckEmailDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  code: string;
}
