// src/tender/dto/CreateTender.dto.ts
import { IsString, IsNumber, IsDate, IsBoolean, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTenderDto {
  @IsNumber()
  organization_id: number;

  @IsString()
  details: string;

  @Type(() => Date)
  @IsDate()
  open_at: Date;

  @Type(() => Date)
  @IsDate()
  close_at: Date;

  @IsBoolean()
  document_buy_option: boolean;

  @IsEnum(['DOWN', 'OPEN', 'YET'] as const)
  status: 'DOWN' | 'OPEN' | 'YET';
}
