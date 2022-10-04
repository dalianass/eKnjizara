import { Book } from './../_models/book';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getBook(id: number) {
    return this.getAllBooks().pipe(
      map(nizKnjiga => {
        return nizKnjiga.find(p=>p.id  === id);
        //propertiesArray - nizKnjiga
      })
    );
  }

  getAllBooks() : Observable<Book[]> {
    return this.http.get<Book[]>( this.baseUrl+ "/knjige");
  }

  addBook (book : Book) {
    return this.http.post( this.baseUrl+ '/knjige/add-book', book);
  }

  removeBook(bookId:any) {
    return this.http.delete(this.baseUrl + '/knjige/delete?id=' + bookId);
  }
}
