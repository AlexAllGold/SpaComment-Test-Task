import { IsInt, IsOptional } from "class-validator";
import { defaultPage, defaultLimit } from '../utils/constants'
export class PaginationDto{
  @IsInt()
  @IsOptional()
  page?: number;

  @IsInt()
  @IsOptional()
  limit?: number;

  constructor(query: PaginationDto) {
    this.page = query?.page || defaultPage;
    this.limit = query?.limit || defaultLimit;
  }
}