import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { ArticleService } from './article.service';
import { Kini_coffee_articles } from './entity/article.entity';
import { Kopi_sepeda_articles } from './entity/articleKopiSepeda.entity';
import * as paginationUtils from '../utils/paginationUtils';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ArticleService', () => {
  let service: ArticleService;
  let articleRepository: Repository<Kini_coffee_articles>;
  let kopiSepedaRepository: Repository<Kopi_sepeda_articles>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(Kini_coffee_articles),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Kopi_sepeda_articles),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    articleRepository = module.get<Repository<Kini_coffee_articles>>(
      getRepositoryToken(Kini_coffee_articles)
    );
    kopiSepedaRepository = module.get<Repository<Kopi_sepeda_articles>>(
      getRepositoryToken(Kopi_sepeda_articles)
    );
  });

  describe('findAllData', () => {
    it('should return merged data of Kini_coffee_articles and Kopi_sepeda_articles', async () => {
      const kiniCoffeeData = [{ id: 1, title: 'Article 1', content: '<p></p>' }];
      const kopiSepedaData = [{ id: 2, title: 'Article 2', content: '<p></p>' }];

      jest.spyOn(articleRepository, 'find').mockResolvedValueOnce(kiniCoffeeData);
      jest.spyOn(kopiSepedaRepository, 'find').mockResolvedValueOnce(kopiSepedaData);

      const result = await service.findAllData();

      expect(result).toEqual({ kiniCoffee: kiniCoffeeData, kopiSepeda: kopiSepedaData });
      expect(articleRepository.find).toHaveBeenCalled();
      expect(kopiSepedaRepository.find).toHaveBeenCalled();
    });
  });

  describe('findArticlekiniCoffee', () => {
    it('should return paginated Kini_coffee_articles', async () => {
      const page = 1;
      const limit = 10;
      const articles = [{ id: 1, title: 'Article 1' }];

      const paginationSpy = jest.spyOn(paginationUtils, 'pagination').mockResolvedValueOnce(articles);

      const result = await service.findArticlekiniCoffee(page, limit);

      expect(paginationSpy).toHaveBeenCalledWith(page, limit, articleRepository);
      expect(result).toEqual(articles);
    });
  });

  describe('findArticleKopiSepeda', () => {
    it('should return paginated Kopi_sepeda_articles', async () => {
      const page = 1;
      const limit = 10;
      const articles = [{ id: 2, title: 'Article 2' }];

      const paginationSpy = jest.spyOn(paginationUtils, 'pagination').mockResolvedValueOnce(articles);

      const result = await service.findArticleKopiSepeda(page, limit);

      expect(paginationSpy).toHaveBeenCalledWith(page, limit, kopiSepedaRepository);
      expect(result).toEqual(articles);
    });
  });

  describe('getTotalCountkini', () => {
    it('should return total count of Kini_coffee_articles', async () => {
      const totalCount = 5;

      const getTotalCountSpy = jest.spyOn(paginationUtils, 'getTotalCount').mockResolvedValueOnce(totalCount);

      const result = await service.getTotalCountkini();

      expect(getTotalCountSpy).toHaveBeenCalledWith(articleRepository);
      expect(result).toEqual(totalCount);
    });
  });

  describe('getTotalCountSepeda', () => {
    it('should return total count of Kopi_sepeda_articles', async () => {
      const totalCount = 10;

      const getTotalCountSpy = jest.spyOn(paginationUtils, 'getTotalCount').mockResolvedValueOnce(totalCount);

      const result = await service.getTotalCountSepeda();

      expect(getTotalCountSpy).toHaveBeenCalledWith(kopiSepedaRepository);
      expect(result).toEqual(totalCount);
    });
  });
});
