import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kini_coffee_articles } from './entity/article.entity';
import { Repository } from 'typeorm';
import { Kopi_sepeda_articles } from './entity/articleKopiSepeda.entity';
import { getTotalCount, pagination } from '../utils/paginationUtils';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Kini_coffee_articles)
    private readonly articleRepository: Repository<Kini_coffee_articles>,
    @InjectRepository(Kopi_sepeda_articles)
    private readonly kopiSepedaRepository: Repository<Kopi_sepeda_articles>,
  ) {}

  async findAllData(): Promise<any> {
    const kiniCoffee = await this.articleRepository.find();
    const kopiSepeda = await this.kopiSepedaRepository.find();

    const mergedData = {
      kiniCoffee,
      kopiSepeda,
    };
    return mergedData;
  }

  async findArticlekiniCoffee(
    page: number,
    limit: number,
  ): Promise<Kini_coffee_articles[]> {
    const articles = await pagination(page, limit, this.articleRepository, {
      created_at: 'DESC',
    });
    return articles;
  }

  async findArticleKopiSepeda(
    page: number,
    limit: number,
  ): Promise<Kopi_sepeda_articles[]> {
    const articles = await pagination(page, limit, this.kopiSepedaRepository, {
      created_at: 'DESC',
    });
    return articles;
  }

  async getTotalCountkini(): Promise<number> {
    const articleCount = await getTotalCount(this.articleRepository);
    return articleCount;
  }

  async getTotalCountSepeda(): Promise<number> {
    const articleCount = await getTotalCount(this.kopiSepedaRepository);
    return articleCount;
  }
}
