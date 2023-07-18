import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { AboutUsModule } from './about-us/about-us.module';
import { BannerModule } from './banner/banner.module';
import { VisimisiModule } from './visimisi/visimisi.module';
import { GaleryModule } from './galery/galery.module';
import { YoutubeModule } from './youtube/youtube.module';
import { ArticleModule } from './article/article.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [ProductModule, TypeOrmModule.forRoot(typeOrmConfig), AboutUsModule, BannerModule, VisimisiModule, GaleryModule, YoutubeModule, ArticleModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
