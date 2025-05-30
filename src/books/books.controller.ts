import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  // Menangani request POST ke /books
  @Post()
  create(@Body() createBookDto: { title: string; author: string }): any {
    const newBook = this.booksService.create(createBookDto);
    return {
      message: 'book created successfully',
      data: newBook,
    };
  }

  // Menangani request PUT ke /books/:id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: { title?: string; author?: string },
  ): any {
    const updatedBook = this.booksService.update(+id, updateBookDto);
    if (!updatedBook) {
      throw new NotFoundException(`book with id ${id} not found`);
    }
    return {
      message: `book with id ${id} updated successfully`,
      data: updatedBook,
    };
  }
  // Menangani request DELETE ke /books/:id
  @Delete(':id')
  remove(@Param('id') id: string): any {
    const removed = this.booksService.remove(+id);
    if (!removed) {
      throw new NotFoundException(`book with id ${id} not found`);
    }
    return {
      message: `book with id ${id} deleted successfully`,
    };
  }
}
