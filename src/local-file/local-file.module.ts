import { Module } from '@nestjs/common';
import { LocalFileService } from './local-file.service';
import { LocalFileController } from './local-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalFile } from './entities/local-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocalFile])],
  controllers: [LocalFileController],
  providers: [LocalFileService],
  exports: [LocalFileService],
})
export class LocalFileModule {}
