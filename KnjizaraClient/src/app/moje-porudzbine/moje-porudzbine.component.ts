import { User } from 'src/app/_models/user';
import { take, map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { PorudzbinaService } from '../_services/porudzbina.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moje-porudzbine',
  templateUrl: './moje-porudzbine.component.html',
  styleUrls: ['./moje-porudzbine.component.css']
})
export class MojePorudzbineComponent implements OnInit {
  currentUser: any;
  mojePorudzbine: any;
  constructor(private porudzbinaService: PorudzbinaService, private accountService: AccountService) { }

  ngOnInit(): void {
  this.currentUser = localStorage.getItem('user');
  this.currentUser = JSON.parse(this.currentUser);
console.log(this.currentUser.userName)
  this.getMojePorudzbine();
  }

  getMojePorudzbine() {
    return this.porudzbinaService.getMojePorudzbine(this.currentUser.id).subscribe(
      (items) => {
        this.mojePorudzbine = items;
        console.log(this.mojePorudzbine);
  console.log(this.currentUser);

      }
    )

  }

  // getBook(id: number) {
  //   return this.getAllBooks().pipe(
  //     map(nizKnjiga => {
  //       return nizKnjiga.find(p=>p.id  === id);
  //       //propertiesArray - nizKnjiga
  //     })
  //   );
  // }


}
