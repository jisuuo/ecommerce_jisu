import { Controller } from '@nestjs/common';
import { LocalFileService } from './local-file.service';

@Controller('local-file')
export class LocalFileController {
  constructor(private readonly localFileService: LocalFileService) {}
}
