import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

describe('ArticleController', () => {
  let controller: ArticleController;
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: {
            findAllData: jest.fn(),
            findArticlekiniCoffee: jest.fn(),
            getTotalCountkini: jest.fn(),
            findArticleKopiSepeda: jest.fn(),
            getTotalCountSepeda: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
    service = module.get<ArticleService>(ArticleService);
  });

  describe('findAll', () => {
    it('should return articles from ArticleService', async () => {
      const articles = [{ id: 1, title: 'Article 1' }];
      const response: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      jest.spyOn(service, 'findAllData').mockResolvedValueOnce(articles);

      await controller.findAll(response);

      expect(service.findAllData).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({ data: articles });
    });

    it('should return 500 Internal Server Error if an error occurs', async () => {
      const response: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      jest.spyOn(service, 'findAllData').mockRejectedValueOnce(new Error('Internal Server Error'));

      await controller.findAll(response);

      expect(service.findAllData).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });

  describe('findArticleKiniCoffee', () => {
    it('should return paginated articles from ArticleService for Kini Coffee', async () => {
      const articles = [{ id: 1, title: 'Article 1', content: 'p' }];
      const totalCount = 5;
      const totalPages = 1;
      const page = 1;
      const limit = 10;
      const response: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      jest.spyOn(service, 'findArticlekiniCoffee').mockResolvedValueOnce(articles);
      jest.spyOn(service, 'getTotalCountkini').mockResolvedValueOnce(totalCount);

      await controller.findArticleKiniCoffee(response, page, limit);

      expect(service.findArticlekiniCoffee).toHaveBeenCalledWith(page, limit);
      expect(service.getTotalCountkini).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({ data: articles, totalPages });
    });

    it('should return 500 Internal Server Error if an error occurs', async () => {
      const response: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      jest.spyOn(service, 'findArticlekiniCoffee').mockRejectedValueOnce(new Error('Internal Server Error'));

      await controller.findArticleKiniCoffee(response, 1, 10);

      expect(service.findArticlekiniCoffee).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ message: 'internal server error' });
    });
  });

  describe('findArticleKopiSepeda', () => {
    it('should return paginated articles from ArticleService for Kopi Sepeda', async () => {
      const articles = [{ id: 2, title: 'Article 2', content: 'p' }];
      const totalCount = 10;
      const totalPages = 1;
      const page = 1;
      const limit = 10;
      const response: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      jest.spyOn(service, 'findArticleKopiSepeda').mockResolvedValueOnce(articles);
      jest.spyOn(service, 'getTotalCountSepeda').mockResolvedValueOnce(totalCount);

      await controller.findArticleKopiSepeda(response, page, limit);

      expect(service.findArticleKopiSepeda).toHaveBeenCalledWith(page, limit);
      expect(service.getTotalCountSepeda).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({ data: articles, totalPages });
    });
  });
});