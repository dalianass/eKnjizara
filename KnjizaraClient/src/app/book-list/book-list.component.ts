import { BookService } from './../_services/book.service';
import { Book } from './../_models/book';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  nizKnjiga: Array<Book> = [];
  // nizKnjiga: any;
  searchText: string = '';
  nizSearch : any[] = [];

  constructor(private bookService:BookService) { }

  ngOnInit() {

    this.bookService.getAllBooks().subscribe(
        knjige => {
          this.nizKnjiga = knjige;
          this.nizKnjiga.forEach((a:any) => {
          Object.assign(a, {quantity:1, total: a.cena});
        });
      }, error => {
        console.log(error);
      })
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText);
  }


  // search(searchValue : string) {
  //   for(let i : any; i<this.nizKnjiga.length; i++){
  //     if(this.nizKnjiga[i].naslov.toLowerCase().includes(searchValue) || this.nizKnjiga[i].autor.toLowerCase().includes(searchValue)) {
  //       this.nizSearch.push("Clan");
  //     }
  //   }
  //   this.nizSearch.push("Put");
  //   return console.log(this.nizSearch);
  // }

  // pozovi() {
  // this.search(this.searchText);
  // }


}
