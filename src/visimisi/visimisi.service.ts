import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { visimisis } from './entity/visiMisi.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VisimisiService {
  constructor(
    @InjectRepository(visimisis)
    private readonly visiMisiRepository: Repository<visimisis>,
  ) {}

  async findAll(): Promise<visimisis[]> {
    return await this.visiMisiRepository.find()
  }
}
