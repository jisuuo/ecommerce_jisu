import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayloadInterface } from './interfaces/tokenPayload.interface';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  // 회원가입 로직
  async createdUser(createUserDto: CreateUserDto) {
    return await this.userService.createdUser(createUserDto);
  }

  // 로그인 로직
  async loginUser(loginUserDto: LoginUserDto) {
    // 이메일 유무 체크
    const user = await this.userService.getUserByEmail(loginUserDto.email);
    // 패스워드 매칭
    //const isMatched = await bcrypt.compare(loginUserDto.password, user.password);
    const isMatched = await user.checkPassword(loginUserDto.password);
    if (!isMatched) {
      throw new HttpException('Password do not matched', HttpStatus.CONFLICT);
    }
    return user;
  }

  // aceessToken 생성 로직
  async getCookieWithJWTAccessToken(userId: string) {
    const payload: TokenPayloadInterface = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPRIATION_TIME',
      )}`,
    });
    return token;
  }

  // 이메일 전송 테스트 로직
  async emailTest(email: string) {
    const generateNumber = this.generatOTP();
    await this.emailService.sendMail({
      to: email,
      subject: '이메일 인증-지수',
      text: `이메일을 인증합니다. 아래번호를 확인해주세요 ${generateNumber}`,
    });
  }

  generatOTP() {
    let OTP = '';
    for (let i = 1; i <= 6; i++) {
      OTP += Math.floor(Math.random() * 10);
    }
    return OTP;
  }
}
