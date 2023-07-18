import { Controller, Get, NotFoundException } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { youtubes } from './entity/youtube.entity';

@Controller('youtube')
export class YoutubeController {
  constructor(
    private readonly youtubeService: YoutubeService
  ) {}

  @Get()
  async findAll(): Promise<youtubes[]> {
    try {
      return await this.youtubeService.findWithImg()
    } catch (error) {
      throw new NotFoundException('not found')
    }
  }
}
