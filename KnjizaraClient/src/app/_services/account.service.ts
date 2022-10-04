import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { HttpClient, } from '@angular/common/http';
import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.baseUrl;
  // role$ : Observable<string> = new Observable<string>();

  public currentUser: any; //dodala
  public currentUserSource = new ReplaySubject<User | any>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http : HttpClient, private router: Router) { }

  register(model:any) {
    return this.http.post(this.baseUrl + '/account/register', model).pipe(
      map((user : User | any) => {
        if(user) {
          alert("Uspesno ste se registrovali. Na vas mejl stici ce link da potvrdite registraciju. Molim vas potvrdite registraciju, a nakon toga se mozete ulogovati.");
          // this.setCurrentUser(user);
        }
      })
    )
  }

  login(model:any){
    return this.http.post(this.baseUrl + '/account/login', model).pipe(
      map((response:User | any)=>{
        const user = response;
        if(user) {
          this.setCurrentUser(user);
          // window.location.reload();
          // this.router.navigateByUrl('/');
          this.currentUser$.pipe(take(1)).subscribe( user => this.currentUser = user); //dodala
          console.log(this.currentUser);
          // this.role$ = this.currentUser.roles;
        }
      })
    )
  }

  setCurrentUser(user:User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;

    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    this.currentUserSource.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    console.log(this.currentUser$);

  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
    //za pristup payloadu. atob desifrira
  }

  confirmEmail(model:any) {
    return this.http.post(this.baseUrl + '/account/confirmemail', model);
  }
}
