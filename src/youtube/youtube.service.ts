import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { youtubes } from './entity/youtube.entity';
import { Repository } from 'typeorm';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class YoutubeService {
  constructor(
    @InjectRepository(youtubes)
    private readonly youtubeRepository: Repository<youtubes>
  ){}

  async findAll(): Promise<youtubes[]> {
    return await this.youtubeRepository.find()
  }

  async findImg(): Promise<any[]> {
    try {
      const TokenApi: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      }
      const res = await axios.get(`${process.env.API_URL_STRAPI}/youtubes?populate=*`, TokenApi)
      const data = res.data.data.map((item: any) => {
        const thumbnailUrl = item.attributes.thumbnail.data.attributes.url;
        return {
          id: item.id,
          url: thumbnailUrl
        }
      })
      return data
    } catch (error) {
      throw new NotFoundException('failed to fetch')
    }
  }

  async findWithImg(): Promise<youtubes[]>{
    try {
      const youtubes = await this.findAll()
      const images = await this.findImg()
      const mergedData= youtubes.map((item) => {
        const image = images.find((img) => img.id === item.id)
        return {
          ...item,
          thumbnail: image ? `${process.env.API_URL_STRAPI_2}${image.url}` : '',
        }
      })
      return mergedData
    } catch (error) {
      throw new NotFoundException('youtube Not found')
    }
  }
}
