import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { AccountService } from './_services/account.service';
import { Routes, RouterModule } from '@angular/router';
import { PorudzbinaService } from './_services/porudzbina.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BookService } from './_services/book.service';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PorudzbinaComponent } from './porudzbina/porudzbina.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AddBookComponent } from './add-book/add-book.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PristiglePorudzbineComponent } from './pristigle-porudzbine/pristigle-porudzbine.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { SearchComponent } from './search/search.component';
import { MojePorudzbineComponent } from './moje-porudzbine/moje-porudzbine.component';
import { HasRoleDirective } from './_directives/has-role.directive';


const appRoutes: Routes = [
  {path: '', component: BookListComponent },
  {path: 'o-nama', component: AboutUsComponent },
  {path: 'add-book', component: AddBookComponent },
  {path: 'book-detail/:id', component: BookDetailComponent },
  {path: 'user/login', component: UserLoginComponent },
  {path: 'user/register', component: UserRegisterComponent },
  {path: 'porudzbina', component: PorudzbinaComponent },
  {path: 'admin', component: AdminPanelComponent},
  {path: 'confirmemail', component: ConfirmEmailComponent},
  {path: 'pristigle-porudzbine', component: PristiglePorudzbineComponent},
  {path: 'moje-porudzbine', component: MojePorudzbineComponent},


  {path: '**', component: BookListComponent }
  //u slucaju bilo kog drugog patha, **, prikazi booklistcomponent
  ]

@NgModule({
  declarations: [
    AppComponent,
    BookCardComponent,
    BookListComponent,
    BookDetailComponent,
    FooterComponent,
    NavbarComponent,
    UserLoginComponent,
    UserRegisterComponent,
    PorudzbinaComponent,
    ConfirmEmailComponent,
    PhotoEditorComponent,
    AddBookComponent,
    AboutUsComponent,
    PristiglePorudzbineComponent,
    AdminPanelComponent,
    UserManagementComponent,
    SearchComponent,
    MojePorudzbineComponent,
    HasRoleDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  providers: [
    BookService,
    PorudzbinaService,
    AccountService,
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
