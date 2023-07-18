import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner_titles } from './entity/bannerTitle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Banner_titles])],
  providers: [BannerService],
  controllers: [BannerController]
})
export class BannerModule {}
