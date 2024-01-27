import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';

import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from './entities/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { AccssTokenGuard } from '../auth/guards/accss-token.guard';
import { RequestWithUser } from '../auth/interfaces/requestWithUser.interface';
import LocalFilesInterceptor from '../common/interceptors/localfiles.interceptor';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseGuards(RoleGuard(Role.ADMIN))
  async getUsers() {
    return await this.userService.getUsers();
  }

  // @Post('profile/img')
  // @UseGuards(AccssTokenGuard)
  // @UseInterceptors(
  //   LocalFilesInterceptor({
  //     fieldName: 'file',
  //     path: 'profileImg',
  //   }),
  // )
  // async addProfileImg(
  //   @Req() req: RequestWithUser,
  //   @UploadedFiles() file: Express.Multer.File,
  // ) {
  //   return await this.userService.addProfileImg(req.user.id, {
  //     path: file.path,
  //     filename: file.originalname,
  //     mimetype: file.mimetype,
  //   });
  // }
  @Post('profile/img')
  @UseGuards(AccssTokenGuard)
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/profileImg',
    }),
  )
  async addProfileImg(
    @Req() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(`------`, req.user);
    return this.userService.addProfileImg(req.user.id, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }
}
