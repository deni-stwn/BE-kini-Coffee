import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { contacts } from './entity/contact.entity';
import { Repository } from 'typeorm';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class ContactService {
  constructor(@InjectRepository(contacts) private readonly contactRespository: Repository<contacts>){}

  async findData():Promise<contacts[]> {
    return await this.contactRespository.find()
  }

  async findImg(): Promise<any> {
    try {
      const TokenApi: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      }
      const res = await axios.get(`${process.env.API_URL_STRAPI}/contacts?populate=*`, TokenApi)
      const data = res.data.data.map((image: any) => {
        const imgUrl = image.attributes.image_contact.data.attributes.url
        return {
          id: image.id,
          url: imgUrl
        }
      })
      return data
    } catch (error) {
      throw new NotFoundException('Failed to fetch images');
    }
  }

  async findWithImg():Promise<contacts[]> {
    const contacts = await this.findData()
    const imageUrl = await this.findImg()

    const mergedData = contacts.map((item) => {
      const image = imageUrl.find((img: any) => img.id === item.id)
      return {
        ...item,
        image_contact: image ? `${process.env.API_URL_STRAPI_2}${image.url}` : ''
      }
    })
    return mergedData
  }
}
