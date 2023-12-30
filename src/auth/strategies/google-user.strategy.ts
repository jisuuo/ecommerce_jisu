import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { Provider } from '../../user/entities/provider.enum';

@Injectable()
export class GoogleUserStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('GOOGLE_AUTH_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_AUTH_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { provider, displayName, email, picture } = profile;
    try {
      console.log('++++++++++++++++++++');
      const user = await this.userService.getUserByEmail(email);
      if (user.provider !== provider) {
        throw new HttpException('Not Matched Provider', HttpStatus.CONFLICT);
      }
      console.log('++++++++++++++++++++');
      done(null, user);
    } catch (err) {
      console.log('--------------------', err.status);
      if (err.status === 404) {
        // 회원가입 프로세스
        console.log('dddd');
        const newUser = await this.userService.createdUser({
          email,
          username: displayName,
          profileImg: picture,
          provider,
        });
        done(null, newUser);
      }
    }
  }
}
