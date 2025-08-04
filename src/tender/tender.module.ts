import { Module } from '@nestjs/common';
import { TenderController } from './tender.controller';
import { TenderService } from './tender.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TenderController],
  providers: [TenderService, PrismaService, JwtService]
})
export class TenderModule {}
