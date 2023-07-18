import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { contacts } from './entity/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([contacts])],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
