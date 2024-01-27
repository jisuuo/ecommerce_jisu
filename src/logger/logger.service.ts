import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from './entity/logger.entity';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(Logger)
    private readonly loggerRepository: Repository<Logger>,
  ) {}

  async createLogger(createLogDto: CreateLogDto) {
    const newLog = await this.loggerRepository.create(createLogDto);
    await this.loggerRepository.save(newLog, {
      data: {
        isCreatingLogs: true,
      },
    });
    return newLog;
  }
}
