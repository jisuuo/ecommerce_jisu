import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  // 회원가입
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // User 생성 api
  async createdUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepo.create(createUserDto);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if(user) return user;
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}