import { Injectable } from '@nestjs/common';

interface Book {
  id: number;
  title: string;
  author: string;
}

@Injectable()
export class BookService {
  private books: Book[] = [];

  // menampilkan semua data buku
  findAll(): Book[] {
    return this.books;
  }

  // menambahkan data buku
  create(book: Omit<Book, 'id'>): Book {
    const newBook = { id: this.books.length + 1, ...book };
    this.books.push(newBook);
    return newBook;
  }

  // menampilkan data buku berdasarkan id
  findOne(id: number): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  // mengupdate buku
  update(id: number, updatedBook: Partial<Book>): Book | undefined {
    const index = this.books.findIndex((book) => book.id === id);
    if (index !== -1) {
      this.books[index] = { ...this.books[index], ...updatedBook };
      return this.books[index];
    }
    return undefined;
  }

  // menghapus buku
  remove(id: number): boolean {
    const initialLength = this.books.length;
    this.books = this.books.filter((book) => book.id !== id);
    return this.books.length < initialLength;
  }
}
