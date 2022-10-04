import { Router } from '@angular/router';
import { Book } from './../_models/book';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../_services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  addBookForm: FormGroup | any;
  book : Book | any;
  constructor(private router: Router,
    private fb: FormBuilder,
    private bookService: BookService) { }

  ngOnInit(): void {
    this.createAddBookForm();
    // this.bookService.getAllBooks().subscribe(data => {
    //   console.log(data);
    // });
  }

  createAddBookForm() {
    this.addBookForm = this.fb.group({
      cena: [null, Validators.required],
      autor: [null, Validators.required],
      naslov: [null, Validators.required],
      godinaIzdanja: [null, Validators.required],
      about: [null, Validators.required],
      izdavac: [null, Validators.required],
      kolicinaUMagacinu: [null, Validators.required]
    })
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    // this.mapBook();
    this.bookService.addBook(this.addBookForm.value).subscribe(
      response => {
        console.log(response);
      }, err => {
        console.log(err);
      }
    );

    if (this.addBookForm.valid) {
      alert("Uspesno ste dodali knjigu");
      this.router.navigate(['/']);

    }
    else {
      alert("Greska! Proverite da li su polja ispravno uneta.");
    }
  }

}
