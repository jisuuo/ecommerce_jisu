import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { LocalUserGuard } from './guards/local-user.guard';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { use } from 'passport';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입 api
  @Post('signup')
  async creatUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createdUser(createUserDto);
  }

  // 로그인 api
  // @Post('login')
  // async loginUser(@Body() loginUserDto: LoginUserDto) {
  //   return await this.authService.loginUser(loginUserDto);
  // }

  @Post('login')
  @UseGuards(LocalUserGuard)
  async loginUser(@Req() req: RequestWithUser) {
    const user = req.user;
    const token = await this.authService.getCookieWithJWTAccessToken(user.id);
    return {
      user,
      token,
    };
  }
}
