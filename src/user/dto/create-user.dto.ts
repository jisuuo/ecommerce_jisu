import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '../entities/provider.enum';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @MinLength(7)
  @IsString()
  @ApiProperty()
  password?: string;

  @IsString()
  @ApiProperty()
  provider?: Provider = Provider.LOCAL;

  @ApiProperty()
  profileImg?: string;
}
