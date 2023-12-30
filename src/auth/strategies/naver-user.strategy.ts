import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { use } from 'passport';

@Injectable()
export class NaverUserStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('NAVER_AUTH_CLIENT_ID'),
      clientSecret: configService.get('NAVER_AUTH_CLIENT_SECRET'),
      callbackURL: configService.get('NAVER_AUTH_CALLBACK_URL'),
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const { provider, displayName } = profile;
    const { email, profile_image } = profile._json;
    //done(null, profile);
    try {
      // 이메일 유무 확인
      const user = await this.userService.getUserByEmail(email);
      // 이메일 있으면 provider 체크
      if (user.provider !== provider) {
      }
      // 이메일 저장되있고, provider도 맞으면
      done(null, user);
    } catch (err) {
      // 없는 경우 회원가입 프로세스
      const newUser = await this.userService.createdUser({
        email,
        username: displayName,
        profileImg: profile_image,
        provider,
      });
      done(null, newUser);
    }
  }
}
