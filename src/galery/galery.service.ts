import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Galeries } from './entity/galery.entity';
import { Repository } from 'typeorm';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class GaleryService {
  constructor(@InjectRepository(Galeries) private readonly galeryRepository: Repository<Galeries>){}

  async findAll(): Promise<Galeries[]>{
    return this.galeryRepository.find()
  }

  async findImgGalery(): Promise<any[]> {
    const TokenApi: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`
      }
    }
      const res = await axios.get(`${process.env.API_URL_STRAPI}/galeries?populate=*`, TokenApi)
      const banners = res.data.data.map((item: any) => {
        const bannerUrl = item.attributes.image.data.attributes.url
        return {
          id: item.id,
          url: bannerUrl
        }
      })
      return banners
  }

  async findWithImg(): Promise<Galeries[]>{
    try {
      const galeries = await this.findAll();
      const images = await this.findImgGalery();
  
      // Menggabungkan data produk dengan gambar berdasarkan ID
      const mergedData = galeries.map((galery) => {
        const image = images.find((img: any) => img.id === galery.id);
        return {
          ...galery,
          image: image ? `${process.env.API_URL_STRAPI_2}${image.url}` : '',
        };
      });
      return mergedData
    } catch (error) {
      throw new NotFoundException('Products not found');
    }
  }
}
