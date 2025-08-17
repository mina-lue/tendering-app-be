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
        documentPrice: tender.documentPrice,
      },
    });
  }

  async getRecent() {
    return await this.prisma.tender.findMany({
      where: {
        status: 'OPEN',
        closeAt: {
          gte: new Date(),
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return await this.prisma.tender.findUnique({
      where: {
        id,
      },
    });
  }

  async getAll() {
    const tenders = await this.prisma.tender.findMany();

    // Fetch all users (organizations)
    const users = await this.prisma.user.findMany({
      select: { id: true, name: true },
    });

    // Map user id to name for quick lookup
    const userMap = new Map(users.map((org) => [org.id, org.name]));

    return tenders.map((tender) => ({
      ...tender,
      organization: {
        id: tender.organizationId,
        name: userMap.get(tender.organizationId) || null,
      },
    }));
  }

  async delete(id: number) {
    return await this.prisma.tender.delete({
      where: {
        id,
      },
    });
  }
}
