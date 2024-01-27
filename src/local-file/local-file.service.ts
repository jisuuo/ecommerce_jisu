import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocalFileDto } from './dto/create-local-file.dto';
import { LocalFile } from './entities/local-file.entity';
@Injectable()
export class LocalFileService {
  constructor(
    @InjectRepository(LocalFile)
    private readonly localFileRepository: Repository<LocalFile>,
  ) {}

  async getFileById(fileId: string) {
    const file = await this.localFileRepository.findOneBy({ id: fileId });
    if (!file) {
      throw new NotFoundException('파일을 찾을 수 없습니다.');
    }
    return file;
  }

  async registerFileData(createLocalFileDto: CreateLocalFileDto) {
    const newFile = await this.localFileRepository.create(createLocalFileDto);
    await this.localFileRepository.save(newFile);
    return newFile;
  }
}
