import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AboutUsService } from './about-us.service';
import { Abouts } from './entity/aboutUs.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AboutUsService', () => {
  let service: AboutUsService;
  let aboutUsRepository: Repository<Abouts>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AboutUsService,
        {
          provide: getRepositoryToken(Abouts),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AboutUsService>(AboutUsService);
    aboutUsRepository = module.get<Repository<Abouts>>(getRepositoryToken(Abouts));
  });

  describe('find', () => {
    it('should return an array of Abouts', async () => {
      const abouts: Abouts[] = [
        { id: 1, title: 'About 1', description: 'desc'},
      ];

      jest.spyOn(aboutUsRepository, 'find').mockResolvedValueOnce(abouts);

      const result = await service.find();

      expect(result).toEqual(abouts);
      expect(aboutUsRepository.find).toHaveBeenCalled();
    });

    it('should return an array of Abouts with merged image data', async () => {
      const abouts: Abouts[] = [
        { id: 1, title: 'About 1', description: 'desc' },
        { id: 2, title: 'About 2', description: 'desc' },
      ];
      const banners = [
        { id: 1, url: 'image1.jpg' },
        { id: 2, url: 'image2.jpg' },
      ];

      jest.spyOn(service, 'find').mockResolvedValueOnce(abouts);
      jest.spyOn(service, 'findImg').mockResolvedValueOnce(banners);

      const result = await service.findWithImg();

      expect(result).toEqual([
        {
          id: 1,
          title: 'About 1',
          description: 'desc',
          banner: `${process.env.API_URL_STRAPI_2}image1.jpg`,
        },
        {
          id: 2,
          title: 'About 2',
          description: 'desc',
          banner: `${process.env.API_URL_STRAPI_2}image2.jpg`,
        },
      ]);
      expect(service.find).toHaveBeenCalled();
      expect(service.findImg).toHaveBeenCalled();
    });
  });
});
