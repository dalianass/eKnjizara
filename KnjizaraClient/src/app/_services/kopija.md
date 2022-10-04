import { Porudzbina } from './../_models/porudzbina';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {
  model: Porudzbina | any;

  public listaPorucenihKnjiga : any = [];
  public konacnaListaPorucenihKnjiga = new BehaviorSubject<any>([]);

  constructor() { }

  getProducts() {
    return this.konacnaListaPorucenihKnjiga.asObservable();
  }

  addToCart(knjiga : any) {
    this.listaPorucenihKnjiga.push(knjiga);
    this.konacnaListaPorucenihKnjiga.next(this.listaPorucenihKnjiga);
    this.getTotalPrice(this.model.kolicinaKnjiga);
  }

  getTotalPrice(kolicinaKnjiga: number) : number {
    let ukupno = 0;
    this.listaPorucenihKnjiga.map(
      (a:any) => {
        // ukupno += a.total*a.quantity;
        ukupno += a.cena*kolicinaKnjiga;
    })
    return ukupno;
  }

  removeCartItem(knjiga:any) {
    this.listaPorucenihKnjiga.map((a : any, index: any)=> {
      if(knjiga.id == a.id) {

      // if(knjiga.Id == a.Id) {
        this.listaPorucenihKnjiga.splice(index, 1);
        //The splice() method adds/removes items to/from
        //an array, and returns the removed item(s).
        //Array.splice(start_index, number_of_elements_to_remove);
      }
    })
    this.konacnaListaPorucenihKnjiga.next(this.listaPorucenihKnjiga);
  }

    /*value - the value emitted by the observable. The second argument is
  index number. The index number starts from 0 for the first value emitted
  and incremented by one for every subsequent value emitted.
  It is similar to the index of an array. */

  removeAllCart() {
    this.listaPorucenihKnjiga = [];
    this.konacnaListaPorucenihKnjiga.next(this.listaPorucenihKnjiga);
  }
}
















import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {

  public listaPorucenihKnjiga : any = [];
  public konacnaListaPorucenihKnjiga = new BehaviorSubject<any>([]);

  constructor() { }

  getProducts() {
    return this.konacnaListaPorucenihKnjiga.asObservable();
  }

  addToCart(knjiga : any) {
    this.listaPorucenihKnjiga.push(knjiga);
    this.konacnaListaPorucenihKnjiga.next(this.listaPorucenihKnjiga);
    this.getTotalPrice();
  }

  getTotalPrice() : number {
    let ukupno = 0;
    this.listaPorucenihKnjiga.map(
      (a:any) => {
        // ukupno += a.total*a.quantity;
        ukupno += a.total;
    })
    return ukupno;
  }

  removeCartItem(knjiga:any) {
    this.listaPorucenihKnjiga.map((a : any, index: any)=> {
      if(knjiga.id == a.id) {

      // if(knjiga.Id == a.Id) {
        this.listaPorucenihKnjiga.splice(index, 1);
        //The splice() method adds/removes items to/from
        //an array, and returns the removed item(s).
        //Array.splice(start_index, number_of_elements_to_remove);
      }
    })
    this.konacnaListaPorucenihKnjiga.next(this.listaPorucenihKnjiga);
  }

    /*value - the value emitted by the observable. The second argument is
  index number. The index number starts from 0 for the first value emitted
  and incremented by one for every subsequent value emitted.
  It is similar to the index of an array. */

  removeAllCart() {
    this.listaPorucenihKnjiga = [];
    this.konacnaListaPorucenihKnjiga.next(this.listaPorucenihKnjiga);
  }
}
