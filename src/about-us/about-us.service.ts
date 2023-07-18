import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Abouts } from './entity/aboutUs.entity';
import { Repository } from 'typeorm';
import axios, { AxiosRequestConfig } from 'axios';
const MockAdapter = require('axios-mock-adapter');


@Injectable()
export class AboutUsService {
  constructor(@InjectRepository(Abouts) private readonly aboutUsRepository: Repository<Abouts>) {} 

  async find(): Promise<Abouts[]>{
    try {
      return await this.aboutUsRepository.find()
    } catch (error) {
      throw new NotFoundException('Not Found')
    }
  }

  async findImg(): Promise<any[]> {
    try {
      const TokenApi: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      }
      const response = await axios.get(`${process.env.API_URL_STRAPI}/abouts?populate=*`, TokenApi);
      const data = response.data.data.map((item: any) => {
        const imgAboutUrl = item.attributes.banner_about.data.attributes.url;
        return {
          id: item.id,
          url: imgAboutUrl,
        };
      });
      return data;
    } catch (error) {
      throw new NotFoundException('Failed to fetch images');
    }
  }

  async findWithImg(): Promise<Abouts[]> {
    try {
      const aboutUs = await this.find()
      const banners = await this.findImg()
  
      const mergedData = aboutUs.map((item) => {
        const banner = banners.find((img) => img.id === item.id)
        return {
          ...item,
          banner: banner ? `${process.env.API_URL_STRAPI_2}${banner.url}` : ''
        }
      })
      return mergedData
    } catch (error) {
      throw new NotFoundException('Not found');
    }
  }
}
