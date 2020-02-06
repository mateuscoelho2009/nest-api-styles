import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AUTHORS_RESOURSE, BASE_URL } from '../utils/utils';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../../entities/author.entity';

@Controller(`rest${AUTHORS_RESOURSE}`)
export class AuthorsController {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  @Get('/:id')
  async getAuthorDetails(@Param('id') id) {
    const author = await this.authorRepository.findOne(id);

    return {
      href: `${BASE_URL}${AUTHORS_RESOURSE}/${id}`,
      ...author,
    }
  }
}
