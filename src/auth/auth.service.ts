import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayloadInterface } from './interfaces/tokenPayload.interface';
import { EmailService } from '../email/email.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Provider } from '../user/entities/provider.enum';
import { VerificationTokenPayloadInterfaceInterface } from './interfaces/verificationTokenPayloadInterface.interface';
import { SmsService } from '../sms/sms.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
    @Inject(CACHE_MANAGER) private cacheManger: Cache,
  ) {}

  // 회원가입 로직
  async createdUser(createUserDto: CreateUserDto) {
    return await this.userService.createdUser({
      ...createUserDto,
      provider: Provider.LOCAL,
    });
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
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPRIATION_TIME',
    )}`;
  }

  async getCookieWithJWTRefreshToken(userId: string) {
    const payload: TokenPayloadInterface = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie,
      token,
    };
    //return token;
  }

  // 이메일 전송 테스트 로직
  async sendEmailVerification(email: string) {
    const generateNumber = this.generateOTP();
    // Redis에 저장
    await this.cacheManger.set(email, generateNumber);
    await this.emailService.sendMail({
      to: email,
      subject: '이메일 인증-지수',
      // html에 버튼을 같이 보내고 emailVerify 검증 api
      //text: `이메일을 인증합니다. 아래번호를 확인해주세요 ${generateNumber}`,
    });
    return 'Please Check your email';
  }

  async getCookieForLogout() {
    return [
      `Authentication=; HttpOnly; Path=/; Max-Age= 0`,
      'Refresh=; HttpOnly; Path=/; Max-Age= 0',
    ];
  }

  // 토큰 decode
  async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('VERIFICATION_TOKEN_SECRET'),
      });
      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (err) {
      if (err?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad Confirmation token');
    }
  }

  async sendVerificationLink(email: string) {
    const payload: VerificationTokenPayloadInterfaceInterface = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('VERIFICATION_TOKEN_SECRET'),
      expiresIn: this.configService.get('VERIFICATION_TOKEN_EXPIRATION_TIME'),
    });
    const text = `WELCOME TO THE APPLICATION. TO CONFIRM THE EMAIL ADDRESS, CLICK HERE ${token}`;
    return this.emailService.sendMail({
      to: email,
      subject: 'EMAIL CONFIRMATION',
      text,
    });
  }

  async confirmEmail(email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user.isEmailVerify) {
      throw new BadRequestException('Email already Confirm');
    }
    await this.userService.markEmailAsConfirmed(email);
  }

  // 랜덤넘버 확인 API
  async checkEmailVerification(email: string, code: string) {
    const number = await this.cacheManger.get(email);
    if (number !== code) {
      throw new HttpException('Not Matched', HttpStatus.BAD_REQUEST);
    }
    // 인증 성공 시 데이터 삭제
    await this.cacheManger.del(email);
    return true;
  }

  // 회원가입은 되어 있지만 인증을 하지 않았기에 userId로 user를 찾아야함.
  async resendConfirmLink(userId: string) {
    const user = await this.userService.getUserById(userId);
    if (user.isEmailVerify) {
      throw new BadRequestException('Confirmed Email');
    }
    await this.sendVerificationLink(user.email);
    return 'Please Check your email';
  }

  generateOTP() {
    let OTP = '';
    for (let i = 1; i <= 6; i++) {
      OTP += Math.floor(Math.random() * 10);
    }
    return OTP;
  }

  async sendSms(phone: string) {
    return await this.smsService.initiatePhoneNumberVerification(phone);
  }
}
