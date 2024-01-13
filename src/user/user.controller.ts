import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from './entities/role.enum';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseGuards(RoleGuard(Role.ADMIN))
  async getUsers() {
    return await this.userService.getUsers();
  }
}
