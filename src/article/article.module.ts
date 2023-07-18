import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kini_coffee_articles } from './entity/article.entity';
import { Kopi_sepeda_articles } from './entity/articleKopiSepeda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kini_coffee_articles, Kopi_sepeda_articles])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
