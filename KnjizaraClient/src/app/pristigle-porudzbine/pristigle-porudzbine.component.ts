import { PorudzbinaService } from './../_services/porudzbina.service';
import { AccountService } from './../_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pristigle-porudzbine',
  templateUrl: './pristigle-porudzbine.component.html',
  styleUrls: ['./pristigle-porudzbine.component.css']
})
export class PristiglePorudzbineComponent implements OnInit {

  listaPorucenihKnjiga: any;
  constructor(private http: HttpClient, private porudzbinaService: PorudzbinaService) { }

  ngOnInit(): void {
    this.porudzbinaService.getPorudzbine().subscribe((item : any) => {
      this.listaPorucenihKnjiga = item;
      console.log(this.listaPorucenihKnjiga);
    },
    (error) => {
      alert(JSON.stringify(error))
    })
  }

  zavrsiPorudzbinu(porudzbina: any) {
    porudzbina.isFinished = true;
    this.porudzbinaService.putPorudzbina(porudzbina.id, porudzbina).subscribe(
      () => {
        alert("Uspesno obradjena porudzbina")}
        ,
      (error) => alert(JSON.stringify(error))
    );
  }

}
