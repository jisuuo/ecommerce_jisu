import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';

import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from './entities/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AccessTokenGuard } from '../auth/guards/access-token-guard.service';
import { RequestWithUser } from '../auth/interfaces/requestWithUser.interface';
import { Response } from 'express';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get('all')
  @UseGuards(RoleGuard(Role.ADMIN))
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Post('/profile/image')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfile(
    @Req() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // //console.log(file.originalname);
    // console.log(file);
    // // console.log(file.originalname);
    // // console.log(file.size);

    const diskPath = await file.path.replace(
      this.configService.get('ATTACH_SAVE_PATH'),
      '',
    );

    const imgInfo = {
      fileName: file.originalname,
      path: diskPath.replace(/\\/gi, '/'),
      size: file.size,
    };

    // 프로필 이미지 업데이트
    await this.userService.updateProfileImg(req.user.id, imgInfo.path);
    return imgInfo;
  }

  @Get('/profile/img')
  @UseGuards(AccessTokenGuard)
  async getProfileImg(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;

    if (user.profileImg.includes('https')) {
      return user.profileImg;
    }

    res.download(
      `${this.configService.get('ATTACH_SAVE_PATH')}/${user.profileImg}`,
    );
  }
}
