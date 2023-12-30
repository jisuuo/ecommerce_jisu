import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '../entities/provider.enum';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  provider?: Provider;

  @ApiProperty()
  profileImg?: string;
}
