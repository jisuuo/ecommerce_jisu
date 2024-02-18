import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateLocalFileDto } from '../local-file/dto/create-local-file.dto';
import { LocalFileService } from '../local-file/local-file.service';

@Injectable()
export class UserService {
  // 회원가입
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly localFileService: LocalFileService,
  ) {}

  // User 생성 api
  async createdUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepo.create(createUserDto);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (user) return user;
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async getUserById(userId: string) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (user) return user;
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async getUsers() {
    // const user = await this.getUserById(userId);
    // console.log(user.roles.includes(Role.ADMIN));
    // if (user.roles.includes(Role.ADMIN)) {
    //   throw new HttpException('Not Admin', HttpStatus.BAD_REQUEST);
    // }
    return await this.userRepo.find();
  }

  // 로그인 시 refreshToken을 암호화하여 redis 저장
  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.cacheManager.set(userId, currentHashedRefreshToken);
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.getUserById(userId);
    const getUserByRedis = await this.cacheManager.get(userId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      getUserByRedis,
    );

    console.log(refreshToken);
    console.log(getUserByRedis);

    if (isRefreshTokenMatching) return user;
  }

  async removeRefreshToken(userId: string) {
    return await this.cacheManager.del(userId);
  }

  async markEmailAsConfirmed(email: string) {
    return await this.userRepo.update(
      { email },
      {
        isEmailVerify: true,
      },
    );
  }

<<<<<<< HEAD
  async addProfileImg(userId: string, fileData: CreateLocalFileDto) {
    const newProfileImg =
      await this.localFileService.registerFileData(fileData);
    console.log(`+++++`, newProfileImg);
    // await this.userRepo.update(userId, {
    //   profileImg: newProfileImg.path,
    // });
    const user = await this.userRepo.findOneBy({
      id: userId,
    });
    user.profileImg = newProfileImg.path;
    return user;
=======
  async updateProfileImg(userId: string, profileImg: string) {
    return await this.userRepo.update(
      {
        id: userId,
      },
      {
        profileImg,
      },
    );
>>>>>>> jisu
  }
}
