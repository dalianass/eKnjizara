import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from './../_services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PorudzbinaService } from './../_services/porudzbina.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public totalItem: number = 0;
  user: any;
  constructor(private porudzbinaService : PorudzbinaService, private router: Router, public accountService: AccountService) {
  }
  loggedInUser: string | any;

  ngOnInit() : void {
    this.porudzbinaService.getProducts()
    .subscribe(res => {
      this.totalItem = res.length;
    });

    //refresh stranice je uzrokovao neprikazivanje odredjenih stavki u navbaru
    //jer observable nije bila svakog puta pozivana i menjana samim time.
    //Kodom u nastavku svakog puta se setuje observable (pogledati setCurrentUser i povezanost sa currentUser$) i resava se problem
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);

    if(this.user) {
      this.accountService.setCurrentUser(this.user);

    }
  }

  loggedIn() {
    // return localStorage.getItem('token');
    this.loggedInUser = localStorage.getItem('user');
    this.loggedInUser = JSON.parse(this.loggedInUser);
    return this.loggedInUser;
  }

  onLogout() {
    this.accountService.logout();
    this.router.navigateByUrl("/user/login");
    alert("Uspesno ste se odjavili");
  }

}
