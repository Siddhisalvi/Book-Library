import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://openlibrary.org';
  private cachedSearchResults: { [query: string]: any } = {};

  constructor(private http: HttpClient) { }

  searchBooks(query: string, page: number = 1): Observable<any> {
    if (this.cachedSearchResults[query]) {
      return of(this.cachedSearchResults[query]);
    } else {
      const url = `${this.apiUrl}/search.json?title=${query}&author=${query}&limit=10&page=${page}`;

      return this.http.get<any>(url)
        .pipe(
          tap((response) => {
            this.cachedSearchResults[query] = response;
          }),
          catchError((error) => {
            console.error('An error occurred:', error);
            return of(null);
          })
        );
    }
  }
}
