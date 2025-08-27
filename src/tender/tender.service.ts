import { Injectable } from '@nestjs/common';
import { CreateTenderDto } from './dto/CreateTender.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateTenderDto } from './dto/UpdateTender.dto';

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

  async update(id: number, tender: UpdateTenderDto) {
    return await this.prisma.tender.update({
      where: { id },
      data: tender.document_buy_option
        ? {
            details: tender.details,
            openAt: tender.open_at,
            closeAt: tender.close_at,
            document_buy_option: tender.document_buy_option,
            status: tender.status,
            urlToDoc: tender.urlToDoc,
            documentPrice: tender.documentPrice,
          }
        : {
            details: tender.details,
            openAt: tender.open_at,
            closeAt: tender.close_at,
            document_buy_option: tender.document_buy_option,
            status: tender.status,
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

  async getMyRecent(buyerId: number) {
    return await this.prisma.tender.findMany({
      where: {
        organizationId: buyerId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async getMyTenders(
    filter: 'OPEN' | 'DRAFT' | 'CLOSED',
    organizationId: number,
  ) {
    return await this.prisma.tender.findMany({
      where: {
        status: filter,
        organizationId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async closeTender(id: number, organizationId: number) {
    return await this.prisma.tender.updateMany({
      where: {
        id,
        organizationId,
      },
      data: {
        status: 'CLOSED',
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
