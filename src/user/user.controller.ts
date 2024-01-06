import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtUserGuard } from '../auth/guards/jwt-user.guard';
import { RequestWithUser } from '../auth/interfaces/requestWithUser.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseGuards(JwtUserGuard)
  async getUsers(@Req() req: RequestWithUser) {
    return await this.userService.getUsers(req.user.id);
  }
}
