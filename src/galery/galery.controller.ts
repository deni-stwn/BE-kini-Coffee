import { Controller, Get, NotFoundException } from '@nestjs/common';
import { GaleryService } from './galery.service';
import { Galeries } from './entity/galery.entity';

@Controller('galery')
export class GaleryController {
  constructor(private readonly galeryService: GaleryService) {}

  @Get()
  async findAll(): Promise<Galeries[]> {
    try {
      const galeries = await this.galeryService.findWithImg();
      return galeries
    } catch (error) {
      throw new NotFoundException('Products not found');
    }
  }
}