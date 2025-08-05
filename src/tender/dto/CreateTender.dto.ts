/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/tender/dto/CreateTender.dto.ts
import {
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
  IsEnum,
  ValidateIf,
  IsOptional,
} from 'class-validator';
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

  @IsOptional()
  @ValidateIf((o) => o.document_buy_option === true)
  @IsString()
  urlToDoc: string;

  @IsEnum(['CLOSED', 'OPEN', 'DRAFT'] as const)
  status: 'CLOSED' | 'OPEN' | 'DRAFT';
}
