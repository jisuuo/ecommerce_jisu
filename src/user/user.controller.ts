import {
  Controller,
  Get,
  Post,
  Req,
<<<<<<< HEAD
=======
  Res,
>>>>>>> jisu
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';

import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from './entities/role.enum';
import { ApiTags } from '@nestjs/swagger';
<<<<<<< HEAD
import { AccssTokenGuard } from '../auth/guards/accss-token.guard';
import { RequestWithUser } from '../auth/interfaces/requestWithUser.interface';
import LocalFilesInterceptor from '../common/interceptors/localfiles.interceptor';
=======
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AccessTokenGuard } from '../auth/guards/access-token-guard.service';
import { RequestWithUser } from '../auth/interfaces/requestWithUser.interface';
import { Response } from 'express';
>>>>>>> jisu

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

<<<<<<< HEAD
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
=======
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

    // http://localhost:8000/api/v1/user/[savedPath]?fn=[fileName]
    // http://localhost:8000/api/v1/user/202104/12312541515151.xlsx?fn=다운받을원본파일명.xlsx
    res.download(
      `${this.configService.get('ATTACH_SAVE_PATH')}/${user.profileImg}`,
    );
>>>>>>> jisu
  }
}
