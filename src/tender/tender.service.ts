/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { CreateTenderDto } from './dto/CreateTender.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TenderService {
  constructor(private prisma: PrismaService) {}

  async create(tender: CreateTenderDto) {
    console.log(tender);
    return await this.prisma.tender.findMany();
  }
}
