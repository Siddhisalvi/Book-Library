import { Component } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchTerm: string = '';
  searchResults: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private bookService: BookService) { }

  searchBooks() {
    if (this.searchTerm.trim() !== '') {
      this.loading = true;
      this.error = '';

      this.bookService.searchBooks(this.searchTerm)
        .subscribe(
          (data: any) => {
            this.searchResults = data;
            this.loading = false;
          },
          (error: any) => {
            this.error = 'An error occurred. Please try again later.';
            this.loading = false;
          }
          
        );
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchResults = [];
  }
}
