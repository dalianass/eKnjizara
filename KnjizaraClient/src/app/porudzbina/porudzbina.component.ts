import { Router } from '@angular/router';
import { PorudzbinaService } from './../_services/porudzbina.service';
import { Component, OnInit } from '@angular/core';
import { combineAll } from 'rxjs/operators';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit {
  kolicina: number | any;
  public listaProizvoda: any = [];
  public grandTotal : number = 0;

  constructor(private porudzbinaService : PorudzbinaService, private router: Router) { }

  ngOnInit(): void {
    this.porudzbinaService.getProducts()
    .subscribe(res => {
      this.listaProizvoda = res;
      this.grandTotal = this.porudzbinaService.getTotalPrice();
    })
  }

  removeItem(item : any) {
    this.porudzbinaService.removeCartItem(item);
  }

  emptycart() {
    this.porudzbinaService.removeAllCart();
  }

  racunaj(item:any, kolicina: any) {
    item.total = kolicina.value*item.cena;
    if(kolicina == 1) return;
    item.quantity = kolicina.value;
    this.grandTotal += kolicina.value*item.cena - item.cena;
  }

  posaljiPorudzbinu() {
    let porudzbina : any;
    let nizKnjiga: any[] = [];
    for(let i = 0;i<this.listaProizvoda.length;i++) {
      nizKnjiga[i] = {
          naslov : this.listaProizvoda[i].naslov,
          cena: this.listaProizvoda[i].cena,
          autor:  this.listaProizvoda[i].autor,
          kolicina:  this.listaProizvoda[i].quantity,
      }
    }
    porudzbina = {
      ukupnoZaPlacanje : this.grandTotal,
      isFinished : false,
      knjige: nizKnjiga
    }
    this.porudzbinaService.postPorudzbina(porudzbina).subscribe(() => {
      alert("Uspesno ste prosledili porudzbinu");
      this.emptycart();
      this.router.navigateByUrl("/");
    },
    (error) => {
      alert(JSON.stringify(error));
    })

    console.log(this.listaProizvoda);
  }
}
