import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  registerForm: FormGroup | any;
  validationErrors: string[] = [];


  constructor( private accountService : AccountService, private fb: FormBuilder, private router: Router) {
   }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      userSurname: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8), this.passValid()]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    })

    //kad se ispise confirm password ispravno, pa se nakon toga izmeni password obicni,
    //nije prepoznavao to confirmPassword vise jer se ne poziva metoda za validiranje ponovo.
    //Kodom ispod to resavamo.
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }


  matchValues(matchTo:string) : ValidatorFn {
    return (control:AbstractControl | any) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  passValid() : ValidatorFn {
    return (control:AbstractControl) => {
      const targetString: string = control?.value;
      const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,.;])[A-Za-z\d@$!%*?&,.;]{8,}$/;

      return (targetString.match(regex) != null ) ? null : {passInvalid: true}
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/');
      this.cancel();
    }, error => {
      alert(JSON.stringify(error.error));
      console.log(error);
      this.validationErrors = error;
    }
    )
  }

  cancel() {
    this.cancelRegister.emit(false);
    // this.router.navigateByUrl("/");
  }

}
