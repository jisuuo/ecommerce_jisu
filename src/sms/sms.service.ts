import { BadRequestException, Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  private twilioClient: Twilio;

  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  initiatePhoneNumberVerification(phoneNumber: string) {
    const serviceSid = this.configService.get(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );
    return this.twilioClient.verify.v2
      .services(serviceSid)
      .verifications.create({
        to: phoneNumber,
        channel: 'sms',
      });
  }

  async confirmPhoneVerification(phone: string, verficationCode: string) {
    const serviceSid = this.configService.get(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );

    const result = await this.twilioClient.verify.v2
      .services(serviceSid)
      .verificationChecks.create({
        to: phone,
        code: verficationCode,
      });

    if (!result.valid || result.status !== 'approved') {
      throw new BadRequestException('Wrong code provided');
    }

    return result;
  }
}
