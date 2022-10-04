import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<Partial<User[]>>(this.baseUrl + '/admin/users-with-roles');
  }

  updateUserRoles(email:string, roles: string[]) {
    return this.http.post(this.baseUrl + '/admin/edit-roles/' + email + '?roles=' + roles, {});
    //prazan objekat jer - post metoda koja radi update - radi se sa userManager direktno
  }
}
