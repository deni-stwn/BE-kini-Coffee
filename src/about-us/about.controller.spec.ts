import { Test, TestingModule } from '@nestjs/testing';
import { AboutUsController } from './about-us.controller';
import { AboutUsService } from './about-us.service';
import { Response } from 'express';

describe('AboutUsController', () => {
  let controller: AboutUsController;
  let service: AboutUsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AboutUsController],
      providers: [
        {
          provide: AboutUsService,
          useValue: {
            findWithImg: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AboutUsController>(AboutUsController);
    service = module.get<AboutUsService>(AboutUsService);
  });

  describe('findAll', () => {
    it('should return an array of about data', async () => {
      const aboutData = [
        { id: 1, title: 'About 1', description: 'Description 1' },
        { id: 2, title: 'About 2', description: 'Description 2' },
      ];

      jest.spyOn(service, 'findWithImg').mockResolvedValueOnce(aboutData);

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await controller.findAll(res);

      expect(service.findWithImg).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(aboutData);
    });

    it('should handle error and return 500 status on exception', async () => {
      jest.spyOn(service, 'findWithImg').mockRejectedValueOnce(new Error());

      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await controller.findAll(res);

      expect(service.findWithImg).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Internal server error');
    });
  });
});
