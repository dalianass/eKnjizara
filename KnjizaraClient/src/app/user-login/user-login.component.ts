import { browser } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  model:any = {};
  constructor( public accountService : AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  login()
  {
    this.accountService.login(this.model).subscribe(response => {
      // window.location.reload();
      // this.router.navigate('/');
      this.router.navigateByUrl('/');
    }, error => {
      alert(JSON.stringify(error.error));
      console.log(error);
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
