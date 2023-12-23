import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Provider } from './entities/provider.enum';

@Injectable()
export class UserService {
  // 회원가입
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // User 생성 api
  async createdUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepo.create({
      ...createUserDto,
      provider: Provider.LOCAL,
    });
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
}
