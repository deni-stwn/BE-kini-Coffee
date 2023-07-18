import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner_titles } from './entity/bannerTitle.entity';
import { Repository } from 'typeorm';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class BannerService {
  constructor(@InjectRepository(Banner_titles) private readonly bannerTitleRepository: Repository<Banner_titles>) {}


  async findTitle(): Promise<Banner_titles[]>{
    return await this.bannerTitleRepository.find()
  }

  async findBannerImg(): Promise<any[]>{
    try {
      const TokenApi: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      }
      const res = await axios.get(`${process.env.API_URL_STRAPI}/banners?populate=*`, TokenApi)
      const banners = res.data.data.map((item: any) => {
        const bannerUrl = item.attributes.banner_img.data.attributes.url
        return {
          id: item.id,
          url: `${process.env.API_URL_STRAPI_2}${bannerUrl}`
        }
      })
      return banners
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
