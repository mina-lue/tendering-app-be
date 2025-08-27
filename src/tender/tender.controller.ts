import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/gaurd/jwt.guard';
import { CreateTenderDto } from './dto/CreateTender.dto';
import { TenderService } from './tender.service';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { UpdateTenderDto } from './dto/UpdateTender.dto';

@Controller('api/tenders')
export class TenderController {
  constructor(
    private tenderService: TenderService,
    private userService: UserService,
  ) {}

  @UseGuards(JwtGuard)
  @Post('/new')
  async create(@Body() tender: CreateTenderDto) {
    return await this.tenderService.create(tender);
  }

  @UseGuards(JwtGuard)
  @Get('/recent')
  async getRecent() {
    return await this.tenderService.getRecent();
  }

  @UseGuards(JwtGuard)
  @Get('/my-tenders/recent')
  async getMyRecentTenders(@Req() req: Request) {
    if (!req.user?.username) {
      throw new Error('User email not found in request');
    }
    const organization = await this.userService.findByEmail(req.user?.username);
    if (!organization) {
      throw new Error('Buyer not found');
    }
    return await this.tenderService.getMyRecent(organization.id);
  }

  @UseGuards(JwtGuard)
  @Get('/my-tenders/:filter')
  async getMyTenders(
    @Req() req: Request,
    @Param('filter') filter: 'OPEN' | 'DRAFT' | 'CLOSED',
  ) {
    if (!req.user?.username) {
      throw new Error('User email not found in request');
    }
    const organization = await this.userService.findByEmail(req.user?.username);
    if (!organization) {
      throw new Error('Buyer not found');
    }
    return await this.tenderService.getMyTenders(filter, organization.id);
  }

  @UseGuards(JwtGuard)
  @Put('/tenders/my-tenders/close/:id')
  async closeMyTender(@Param('id') id: number, @Req() req: Request) {
    if (!req.user?.username) {
      throw new Error('User email not found in request');
    }
    const organization = await this.userService.findByEmail(req.user?.username);
    if (!organization) {
      throw new Error('Buyer not found');
    }
    return await this.tenderService.closeTender(id, organization.id);
  }

  // body: JSON.stringify(tenderData)
  @UseGuards(JwtGuard)
  @Put('/my-tenders/update/:id')
  async update(@Param() id: number, @Body() tender: UpdateTenderDto) {
    return await this.tenderService.update(id, tender);
  }

  @UseGuards(JwtGuard)
  @Get('/all')
  async getAll() {
    return await this.tenderService.getAll();
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  async getTenderDetails(@Param('id') id: number) {
    return await this.tenderService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  async deleteTender(@Param('id') id: number) {
    return await this.tenderService.delete(id);
  }
}
