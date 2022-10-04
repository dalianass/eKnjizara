import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {

  public listaPorucenihKnjiga : any = [];
  public konacnaListaPorucenihKnjiga = new BehaviorSubject<any>([]);
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.konacnaListaPorucenihKnjiga.asObservable();
  }

  addToCart(knjiga : any) {
    this.listaPorucenihKnjiga.push(knjiga);
    this.konacnaListaPorucenihKnjiga.next(this.listaPorucenihKnjiga);
  }

  getTotalPrice() : number {
    let ukupno = 0;
    this.listaPorucenihKnjiga.map(
      (a:any) => {
        ukupno += a.total;
    })
    return ukupno;
  }

  removeCartItem(knjiga:any) {
    this.listaPorucenihKnjiga.map((a : any, index: any)=> {
      if(knjiga.id == a.id) {
        this.listaPorucenihKnjiga.splice(index, 1);
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

  postPorudzbina(model:any) {
    return this.http.post(this.baseUrl + '/porudzbina/add-porudzbina', model);
  }

  getPorudzbine() {
    return this.http.get(this.baseUrl + '/porudzbina');
  }

  // getPorudzbina(id : any) {
  //   return this.http.get(this.baseUrl + '/porudzbina/' + id);
  // }

  getMojePorudzbine(id: any) {
    return this.http.get(this.baseUrl + '/porudzbina/moje-porudzbine?id=' + id);

  }

  putPorudzbina(id:number, model: any) {
    return this.http.put(this.baseUrl + '/porudzbina/' + id, model);
  }
}
