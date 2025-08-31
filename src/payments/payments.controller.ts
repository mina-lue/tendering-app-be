import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/gaurd/jwt.guard';
import { PaymentsService } from './payments.service';

@Controller('api/payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getPayments() {
    return await this.paymentsService.getAll();
  }
}
