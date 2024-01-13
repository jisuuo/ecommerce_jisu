import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { RedisModule } from './redis/redis.module';
import { ReviewModule } from './review/review.module';
import { MovieModule } from './movie/movie.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [
    AppConfigModule,
    ProductModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    EmailModule,
    RedisModule,
    ReviewModule,
    MovieModule,
    // 스케줄링
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
