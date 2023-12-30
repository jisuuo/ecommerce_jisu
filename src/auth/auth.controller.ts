import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { LocalUserGuard } from './guards/local-user.guard';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { use } from 'passport';
import { JwtUserGuard } from './guards/jwt-user.guard';
import { CheckEmailDto } from '../user/dto/check-email.dto';
import { GoogleUserGuard } from './guards/google-user.guard';

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

  // 로그인 한 사람의 프로필 정보 가져오기 (토큰 검증)
  @Get()
  @UseGuards(JwtUserGuard)
  async getUserInfoByToken(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Post('email/send')
  async sendEmail(@Body('email') email: string) {
    return await this.authService.sendEmailVerification(email);
  }

  @Post('email/check')
  async checkEmail(@Body() checkEmailDto: CheckEmailDto) {
    return await this.authService.checkEmailVerification(
      checkEmailDto.email,
      checkEmailDto.code,
    );
  }

  // 구글 로그인 api
  @Get('google')
  @UseGuards(GoogleUserGuard)
  async googleLogin() {
    return HttpStatus.OK;
  }
  @Get('google/callback')
  @UseGuards(GoogleUserGuard)
  async googleLoginCallback(@Req() req: RequestWithUser) {
    return req.user;
  }
}
