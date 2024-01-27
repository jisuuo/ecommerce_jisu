import { PartialType } from '@nestjs/swagger';
import { CreateLocalFileDto } from './create-local-file.dto';

export class UpdateLocalFileDto extends PartialType(CreateLocalFileDto) {}
