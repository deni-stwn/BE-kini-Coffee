import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ArticleService } from './article.service';
import { BaseResponseApi } from '../responses/response';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    try {
      const articles = await this.articleService.findAllData();
      res.status(200).json({ data: articles})
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Get('kini-coffee')
  async findArticleKiniCoffee(
    @Res() res: Response,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<void> {
    try {
      const [articles, totalCount] = await Promise.all([
        this.articleService.findArticlekiniCoffee(page, limit),
        this.articleService.getTotalCountkini()
      ])

      const totalPages = Math.ceil(totalCount / limit)
      res.status(200).json({data: articles, totalPages})
    } catch (error) {
      res.status(500).json({message: 'internal server error'})
    }
  }

  @Get('kopi-sepeda')
  async findArticleKopiSepeda(
    @Res() res: Response,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<void> {
    try {
      const [articles, totalCount] = await Promise.all([
        this.articleService.findArticleKopiSepeda(page, limit),
        this.articleService.getTotalCountSepeda()
      ])

      const totalPages = Math.ceil(totalCount / limit)
      res.status(200).json({data: articles, totalPages})
    } catch (error) {
      res.status(500).json({message: 'internal server error'})
    }
  }
}
