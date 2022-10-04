import { take } from 'rxjs/operators';
import { AccountService } from './../_services/account.service';
import { User } from './../_models/user';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  @Input() appHasRole: string[] = [];
  user: User | any;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService)
   {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })
   }

  ngOnInit(): void {
    //clear view if no roles
    if(!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }

    console.log("Izvrsava se direktiva");
    //callback f-ja za svaki element unutar roles
    if(this.user?.roles.some((r : string) => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
