import { Controller, Get, Res } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Response } from 'express';
import { contacts } from './entity/contact.entity';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    try {
      const contacts: contacts [] = await this.contactService.findWithImg()
      res.status(200).json(contacts)
    } catch (error) {
      res.status(404).json({ message: 'Notfound'})
    }
  }
}
