import { Controller, Get } from '@nestjs/common';
import { BannerService } from './banner.service';
import { Banner_titles } from './entity/bannerTitle.entity';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get('/title')
  async findTitle(): Promise<Banner_titles[]> {
    return await this.bannerService.findTitle()
  }

  @Get('/carousel')
  async findImg(): Promise<any[]> {
    return await this.bannerService.findBannerImg()
  }
}
