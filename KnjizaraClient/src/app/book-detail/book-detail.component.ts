import { Book } from './../_models/book';
import { BookService } from './../_services/book.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  public queryId: number | any;
  currentUser: any;
  knjiga : Book | any;

  constructor(private route: ActivatedRoute,
              private router:Router,
              private bookService: BookService) { }

  ngOnInit(): void {
    this.queryId = Number(this.route.snapshot.params['id']);
    //'id' treba da bude uvek nazvano imenom kao u app.module /:id
    //uzima iz url-a vrednost id-a

    this.route.params.subscribe(
      (params)=> {
        this.queryId = +params['id'];
        this.bookService.getBook(this.queryId).subscribe(
          (data : Book | any) => {
            this.knjiga = data;
          })
      });

      this.currentUser = localStorage.getItem('user');
      this.currentUser = JSON.parse(this.currentUser);
  }
}
