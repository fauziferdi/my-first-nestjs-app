import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { BookService } from './books.service';

@Controller('books')
export class BookController {
  constructor(private readonly booksService: BookService) {}

  // Menanganai request get ke /books
  @Get()
  findAll(): any {
    return {
      message: 'list of books',
      data: this.booksService.findAll(),
    };
  }

  // Menangani request get ke /books/:id
  @Get(':id')
  findOne(@Param('id') id: string): any {
    const book = this.booksService.findOne(+id);
    if (!book) {
      throw new NotFoundException(`book with id ${id} not found`);
    }
    return {
      message: `book with id ${id} found`,
      data: book,
    };
  }

  //
}
