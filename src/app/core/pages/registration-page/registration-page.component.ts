import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordValidator} from "../../validators/auth.validators";
import {Router} from "@angular/router";

const EMAIL_PATTERN = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const NAME_PATTERN = new RegExp(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)
const PASSWORD_PATTERN = new RegExp(/(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=(.*\d){3,})(?=.{6,}).*$/)

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  // public emailControl!: FormControl;
  // public passwordControl!: FormControl;
  // public confirmPasswordControl!: FormControl;
  //@Input('email-invalid')
  public disableBtnFromRegistration: boolean = true;
  public hide: boolean = true;

  public registrationForm!: FormGroup;
  //public test: any = this.registrationForm.controls['email']['status'] || ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  public ngOnInit(): void {

    this.initializeForm()
    //const test: any = this.registrationForm.controls['email']['status']
    //this.emailControl.valueChanges.subscribe(console.log)
    // this.registrationForm.valueChanges.subscribe(() =>
    // {console.log('reg form:', this.registrationForm, 'status:',
    //   )})
  }

  public registration(): any {
    // console.log('emailControl', this.emailControl);
    // console.log('emailControl.value', this.emailControl.value);
    if (this.registrationForm.valid) {
      const payLoad = {
        email: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value,
        //confirmPassword: this.registrationForm.get('confirmPassword')?.value,
        name: this.registrationForm.get('name')?.value,
        id: Math.ceil(Math.random()*10000),

        // email: this.emailControl.value,
        // password: this.passwordControl.value,
        // confirmPassword: this.confirmPasswordControl.value
      }
      //console.log('payLoad', payLoad);
      let registeredUsers: any = []
      if (localStorage.getItem('users')) {
        registeredUsers = JSON.parse(localStorage.getItem('users') || '')
        const authUsers = registeredUsers.find((user: any) => user.email === payLoad.email);
        if (authUsers) {
          //console.log('authUsers:', authUsers);
          //localStorage.setItem('session', JSON.stringify(authUsers))
          if (localStorage.getItem('session')) {
            const loggedInUsers = [JSON.parse(localStorage.getItem('session') || '')]
            //const existedUser =
            if (loggedInUsers.find((user: any) => user.email === payLoad.email)) {
              return this.router.navigate(['/home'])
            }

          }
          return this.router.navigate(['/login'])
        }
      }
        //console.log('registeredUsers', registeredUsers);
        registeredUsers.push(payLoad)
        localStorage.setItem('users', JSON.stringify(registeredUsers))

        this.router.navigate(['/login'])


    }
  }

  private initializeForm(): void {
    // this.emailControl = new FormControl<any>('', [])
    // this.passwordControl = new FormControl<any>('', [])
    // this.confirmPasswordControl = new FormControl<any>('', [])

    this.registrationForm = this.fb.group({
      email: new FormControl<any>('',
        [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
      password: new FormControl<any>('', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]),
      confirmPassword: new FormControl<any>('', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]),
      name: new FormControl<any>('',
        [Validators.required, Validators.pattern(NAME_PATTERN)]),

    }, {validators: [passwordValidator]})
  }

  public getClassEmail(string: string): string {
    if (this.registrationForm.hasError('error')) {
      if (string === 'confirmPassword') {
        return 'invalid'
      }
    }
    if (this.registrationForm.controls[string]['status'] === 'INVALID') {
      return 'invalid'
    }
    return ''
  }
  public navToPage(pagePath: any): void {
    this.router.navigate(['/' + pagePath])
  }
  // public routerNavigate(): void {
  //   this.router.navigate(['/login'])
  // }
}
