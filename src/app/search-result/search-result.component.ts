import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchTerm: string = '';
  searchResults: any[] = [];
  loading: boolean = false;
  error: string = '';
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.searchTerm = params['q'];
      this.currentPage = 1;
      this.fetchSearchResults();
    });
  }

  fetchSearchResults() {
    this.loading = true;
    this.error = '';
  
    this.bookService.searchBooks(this.searchTerm, this.currentPage)
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
  

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchSearchResults();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchSearchResults();
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
