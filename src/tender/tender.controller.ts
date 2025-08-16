import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/gaurd/jwt.guard';
import { CreateTenderDto } from './dto/CreateTender.dto';
import { TenderService } from './tender.service';

@Controller('api/tenders')
export class TenderController {
  constructor(private tenderService: TenderService) {}

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
  @Get(':id')
  async getUserProfile(@Param('id') id: number) {
    return await this.tenderService.findById(id);
  }

  

  @UseGuards(JwtGuard)
  @Get('/all')
  async getAll() {
    return await this.tenderService.getAll();
  }
}
