import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';

import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from './entities/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseGuards(RoleGuard(Role.ADMIN))
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Post('/profile/image')
  //@UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfile(@UploadedFile() file: Express.Multer.File) {
    //console.log(file.originalname);
    console.log(file);
    // console.log(file.originalname);
    // console.log(file.size);
  }
}
