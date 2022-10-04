import { Router } from '@angular/router';
import { Book } from './../_models/book';
import { User } from './../_models/user';
import { environment } from './../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  // @Input() knjiga: Book | any;
  @Input() knjigaId: any;
  uploader: FileUploader | any;
  hasBaseDropzoneOver = false;
  baseUrl = environment.baseUrl;
  user:User | any;

  constructor(private http: HttpClient, private router: Router) {

   }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e:any) {
    this.hasBaseDropzoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + '/knjige/add-photo?knjigaId=' + this.knjigaId,
      // authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10*1024*1024
    });

    this.uploader.onAfterAddingFile = (file : any) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item : any, response : any, status : any, headers : any) => {
      if(response) {
        alert("Uspesno ste dodali sliku.");
        this.router.navigateByUrl("/");
        const photo = JSON.parse(response);
        // this.http.post(this.baseUrl + "/knjige/add-photo?knjigaId=" + this.knjigaId, photo).
        // subscribe(
        //   () => {
        //   alert("Uspesno")
        //   },
        //   (error) => {
        //     console.log(error);
        //   });
        // this.knjiga.photos.push(photo);

          // this.user.photoUrl = photo.url;
          // this.knjiga.photoUrl = photo.url;
          // this.accountService.setCurrentUser(this.user);

      }
    }
  }

  // deletePhoto(photoId: number) {
  //   return this.membersService.deletePhoto(photoId).subscribe(() => {
  //     this.knjiga.photos = this.knjiga.photos.filter((x : any) => x.id !== photoId);

  //     this.user.photoUrl = null;
  //     this.knjiga.photoUrl = null;
  //   })
  // }
}
