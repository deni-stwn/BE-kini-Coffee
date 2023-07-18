import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosRequestConfig } from 'axios';
import { Products } from './entity/product.entity';
import { Repository } from 'typeorm';
import { pagination } from 'src/utils/paginationUtils';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  async FindAll(page: number, limit: number): Promise<Products[]> {
    const products = await pagination(page, limit, this.productRepository, {
      created_at: 'DESC',
    });
    return products;
  }

  async findImg(): Promise<any[]> {
    try {
      const TokenApi: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      };
      const response = await axios.get(
        `${process.env.API_URL_STRAPI}/products?populate=*`,
        TokenApi,
      );
      const data = response.data.data.map((item: any) => {
        const thumbnailUrl = item.attributes.thumbnail.data.attributes.url;
        return {
          id: item.id,
          url: thumbnailUrl,
        };
      });
      return data;
    } catch (error) {
      throw new Error('Failed to fetch images');
    }
  }

  async findWithImg(page: number, limit: number): Promise<Products[]> {
    try {
      const products = await this.FindAll(page, limit);
      const images = await this.findImg();

      const mergedData = products.map((product) => {
        const image = images.find((img) => img.id === product.id);
        return {
          ...product,
          image: image ? `${process.env.API_URL_STRAPI_2}${image.url}` : '',
        };
      });
      return mergedData;
    } catch (error) {
      throw new NotFoundException('Product Not Found');
    }
  }

  async getTotalCount(): Promise<number> {
    try {
      return await this.productRepository.count();
    } catch (error) {
      throw new InternalServerErrorException('internal server error');
    }
  }
}
