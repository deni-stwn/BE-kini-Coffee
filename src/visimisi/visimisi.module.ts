import { Module } from '@nestjs/common';
import { VisimisiController } from './visimisi.controller';
import { VisimisiService } from './visimisi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { visimisis } from './entity/visiMisi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([visimisis])],
  controllers: [VisimisiController],
  providers: [VisimisiService]
})
export class VisimisiModule {}
