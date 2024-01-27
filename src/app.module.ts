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
import { ReviewsModule } from './reviews/reviews.module';
import { ProductsModule } from './products/products.module';
import { PricesModule } from './prices/prices.module';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    AppConfigModule,
    TerminusModule,
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
    ReviewsModule,
    ProductsModule,
    PricesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
