import { Controller, Get, NotFoundException, Query, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { Response } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<void> {
    try {
      const [products, totalCount] = await Promise.all([
        this.productService.findWithImg(page, limit),
        this.productService.getTotalCount(),
      ]);

      const totalPages = Math.ceil(totalCount / limit);

      res.status(200).json({ data : products, totalPages: totalPages });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
