import { Controller, Get, Res } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { Response } from 'express';

@Controller('about')
export class AboutUsController {
  constructor(private readonly aboutService: AboutUsService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    try {
      const about = await this.aboutService.findWithImg()
      res.status(200).json(about)
    } catch (error) {
      res.status(500).json('Internal server error')
    }
  }
}
