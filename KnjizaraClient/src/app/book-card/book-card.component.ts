import { Router } from '@angular/router';
import { BookService } from './../_services/book.service';
import { PorudzbinaService } from './../_services/porudzbina.service';
import { Book } from './../_models/book';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  vecDodataKnjiga: any;
  model: any;
  currentUser: any;
  @Input() knjiga: Book | any;
  constructor(private porudzbinaService : PorudzbinaService,
    private bookService: BookService, private router: Router) { }

  ngOnInit() : void{
    this.currentUser = localStorage.getItem('user');
    this.currentUser = JSON.parse(this.currentUser);
  }

  addtocart(item : any) {
    this.porudzbinaService.addToCart(item);
    this.vecDodataKnjiga = this.contains(this.knjiga);
  }

  contains(s: any) {
    if(this.porudzbinaService.listaPorucenihKnjiga.includes(s)){
      return true;
    }
    return false;
  }

  upozorenje() {
  if(this.vecDodataKnjiga) {
      alert("Vec ste dodali ovu knjigu. Kolicinu povecajte direktno unutar porudzbine")
    }

}

removeItem(bookId: any) {
  this.bookService.removeBook(bookId).subscribe(
    () =>  {
      alert("Uspesno ste obrisali knjigu. Refreshujte stranu da biste videli promenu.");
      this.router.navigateByUrl("/");
    },
    (error) => {
      alert(error);
    }
    )
}


}
