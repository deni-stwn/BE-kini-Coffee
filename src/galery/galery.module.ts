import { Module } from '@nestjs/common';
import { GaleryController } from './galery.controller';
import { GaleryService } from './galery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Galeries } from './entity/galery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Galeries])],
  controllers: [GaleryController],
  providers: [GaleryService]
})
export class GaleryModule {}
