import { browser } from 'protractor';
import { Router } from '@angular/router';
// import { RolesModalComponent } from './../modals/roles-modal/roles-modal.component';
import { AdminService } from './../_services/admin.service';
import { Component, OnInit } from '@angular/core';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from '../_models/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: Partial<User[]> | any;
  // bsModalRef: BsModalRef | any;

  isCheckedAdmin: boolean[] = [];
  isCheckedModerator: boolean[] = [];
  isCheckedKorisnik: boolean[] = [];
  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  pozovi() {
    alert(this.isCheckedAdmin[0]);
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => alert(JSON.stringify(error))
    );
  }

  sacuvajUpdate(user: any, index: number) {
    let roles: any[] = [];
    if (this.isCheckedAdmin[index]) {
      roles.push('Admin');
    }
    if (this.isCheckedModerator[index]) {
      roles.push('Moderator');
    }
    if (this.isCheckedKorisnik[index]) {
      roles.push('Korisnik');
    }
    this.adminService.updateUserRoles(user.email, roles).subscribe(
      () => {
        alert(
          'Uspesno sacuvane izmene uloge. Refreshujte da biste videli izmene'
        );
        // browser.refresh();
      },
      (error) => alert('Odaberite uloge!')
    );
  }

  // openRolesModal(user: User) {
  //   const config = {
  //     class: 'modal-dialog-centered',
  //     initialState: {
  //       user,
  //       roles: this.getRolesArray(user)

  //     }
  //   }

  //   this.bsModalRef = this.modalService.show(RolesModalComponent, config);
  //   this.bsModalRef.content.updateSelectedRoles.subscribe((values : any)=> {
  //     const rolesToUpdate = {
  //       roles: [...values.filter((el : any) => el.checked === true).map((el : any) => el.name)]
  //     };
  //     if(rolesToUpdate) {
  //       this.adminService.updateUserRoles(user.email, rolesToUpdate.roles).subscribe(()=>{
  //         user.roles = [...rolesToUpdate.roles]
  //       })
  //     }
  //   })
  // }

  private getRolesArray(user: any) {
    const roles: any[] = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      { name: 'Admin', value: 'Admin' },
      { name: 'Moderator', value: 'Moderator' },
      { name: 'Korisnik', value: 'Korisnik' },
    ];

    availableRoles.forEach((role) => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    });

    return roles;
  }
}
