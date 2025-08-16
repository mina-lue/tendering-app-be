import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/gaurd/jwt.guard';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('/to-be-approved')
  async getToBeApprovedBuyers() {
    return await this.userService.getToBeApprovedBuyers();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Delete('/approve/:email')
  async delete(@Param('email') email: string) {
    return await this.userService.delete(email);
  }

  @UseGuards(JwtGuard)
  @Patch('/approve/:email')
  async appprove(@Param('email') email: string) {
    return await this.userService.approve(email);
  }

  @UseGuards(JwtGuard)
  @Get()
  async allUsers() {
    return await this.userService.allUsers();
  }

  @UseGuards(JwtGuard)
  @Post('/block/:id')
  async blockUser(@Param('id') id: number) {
    return await this.userService.blockUser(id);
  }
}
