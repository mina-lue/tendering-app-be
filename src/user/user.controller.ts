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
  async getUsers() {
    return await this.userService.getUsers();
  }

  @UseGuards(JwtGuard)
  @Get('/all')
  async allUsers() {
    return await this.userService.allUsers();
  }

  @UseGuards(JwtGuard)
  @Get('/total-vendors')
  async totalVendors() {
    return await this.userService.totalVendors();
  }

  @UseGuards(JwtGuard)
  @Get('/total-buyers')
  async totalBuyers() {
    return await this.userService.totalBuyers();
  }

  @UseGuards(JwtGuard)
  @Get('/total-unapproved-buyers')
  async totalUnApprovedBuyers() {
    return await this.userService.totalUnApprovedBuyers();
  }

  @UseGuards(JwtGuard)
  @Get('/total-blocked-vendors')
  async totalBlockedVendors() {
    return await this.userService.totalBlockedVendors();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Post('/block/:id')
  async blockUser(@Param('id') id: number) {
    return await this.userService.blockUser(id, true);
  }

  @UseGuards(JwtGuard)
  @Post('/unblock/:id')
  async unblockUser(@Param('id') id: number) {
    return await this.userService.blockUser(id, false);
  }

  @UseGuards(JwtGuard)
  @Delete(':email')
  async deleteUser(@Param('email') email: string) {
    return await this.userService.delete(email);
  }
}
