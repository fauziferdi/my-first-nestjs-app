import { Module } from '@nestjs/common';
import { BookService } from './books.service';
import { BookController } from './books.controller';

@Module({
  // Controller yang akan menangani request HTTP
  controllers: [BookController],
  // Service yang akan menyediakan logika bisnis
  providers: [BookService],
})
export class BooksModule {}
