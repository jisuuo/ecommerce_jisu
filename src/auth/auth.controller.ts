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
import { LocalUserGuard } from './guards/local-user.guard';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { JwtUserGuard } from './guards/jwt-user.guard';
import { CheckEmailDto } from '../user/dto/check-email.dto';
import { GoogleUserGuard } from './guards/google-user.guard';
import { NaverUserGuard } from './guards/naver-user.guard';

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
    const accessTokenCookie =
      await this.authService.getCookieWithJWTAccessToken(user.id);
    const { cookie: refreshTokenCookie, token: refreshToken } =
      await this.authService.getCookieWithJWTRefreshToken(user.id);

    req.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    return user;
    // return {
    //   user,
    //   accessToken,
    //   refreshToken,
    // };
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
    const { user } = req;
    const token = await this.authService.getCookieWithJWTAccessToken(user.id);
    return {
      user,
      //token,
    };
  }

  @Get('naver')
  @UseGuards(NaverUserGuard)
  async naverLogin() {
    return HttpStatus.OK;
  }
  @Get('naver/callback')
  @UseGuards(NaverUserGuard)
  async naverLoginCallback(@Req() req: RequestWithUser) {
    //return req.user;
    const { user } = req;
    const token = await this.authService.getCookieWithJWTAccessToken(user.id);
    return {
      user,
      //token,
    };
  }
}
