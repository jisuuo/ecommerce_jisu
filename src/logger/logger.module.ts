import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from './entity/logger.entity';
import { ConfigModule } from '@nestjs/config';
import { CustomLogger } from './custom.logger';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Logger])],
  providers: [LoggerService, CustomLogger],
  exports: [CustomLogger],
})
export class LoggerModule {}
