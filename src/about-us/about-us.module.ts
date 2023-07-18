import { Module } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUsController } from './about-us.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abouts } from './entity/aboutUs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Abouts])], 
  providers: [AboutUsService],
  controllers: [AboutUsController]
})
export class AboutUsModule {}
