import { Controller, Get, NotFoundException } from '@nestjs/common';
import { VisimisiService } from './visimisi.service';
import { visimisis } from './entity/visiMisi.entity';

@Controller('visimisi')
export class VisimisiController {
  constructor(private readonly visimisiService: VisimisiService){}

  @Get()
  async findAll(): Promise<visimisis[]> {
    try {
      return this.visimisiService.findAll()
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
