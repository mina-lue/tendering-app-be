import { Injectable } from '@nestjs/common';
import { CreateTenderDto } from './dto/CreateTender.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TenderService {
  constructor(private prisma: PrismaService) {}

  async create(tender: CreateTenderDto) {
    return await this.prisma.tender.create({
      data: {
        organizationId: tender.organization_id,
        details: tender.details,
        openAt: tender.open_at,
        closeAt: tender.close_at,
        document_buy_option: tender.document_buy_option,
        status: tender.status,
        urlToDoc: tender.urlToDoc,
      },
    });
  }

  async getRecent() {
    return await this.prisma.tender.findMany();
  }
}
