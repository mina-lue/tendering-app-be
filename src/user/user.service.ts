import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) {
      throw new ConflictException('Email id already taken!');
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
        approved: dto.role !== 'BUYER',
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, id, ...createdUser } = { ...newUser };

    return createdUser;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getToBeApprovedBuyers() {
    return await this.prisma.user.findMany({
      where: {
        role: 'BUYER',
        approved: false,
      },
    });
  }

  async delete(email: string) {
    return await this.prisma.user.delete({
      where: {
        email,
      },
    });
  }

  async deleteById(id: number) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async approve(email: string) {
    return await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        approved: true,
      },
    });
  }

  async getUsers() {
    return await this.prisma.user.findMany({
      where: {
        approved: true,
        role: {
          not: {
            equals: 'ADMIN',
          },
        },
      },
    });
  }

  async allUsers() {
    return await this.prisma.user.findMany({
      where: {
        role: {
          not: {
            equals: 'ADMIN',
          },
        },
      },
    });
  }

  async blockUser(id: number, status: boolean) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        approved: status,
      },
    });
  }
}
