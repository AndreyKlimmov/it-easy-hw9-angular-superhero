import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordValidator} from "../../validators/auth.validators";

const EMAIL_PATTERN = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  // public emailControl!: FormControl;
  // public passwordControl!: FormControl;
  // public confirmPasswordControl!: FormControl;

  public registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.initializeForm()
    //this.emailControl.valueChanges.subscribe(console.log)
    this.registrationForm.valueChanges.subscribe(() =>
    {console.log('reg form', this.registrationForm)})
  }

  public registration(): void {
    // console.log('emailControl', this.emailControl);
    // console.log('emailControl.value', this.emailControl.value);
    if (this.registrationForm.valid) {
      const payLoad = {
        email: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value,
        confirmPassword: this.registrationForm.get('confirmPassword')?.value

        // email: this.emailControl.value,
        // password: this.passwordControl.value,
        // confirmPassword: this.confirmPasswordControl.value
      }
      console.log('payLoad', payLoad);
      const registeredUser = JSON.stringify(payLoad)
      localStorage.setItem('user', registeredUser)
    }
  }

  private initializeForm(): void {
    // this.emailControl = new FormControl<any>('', [])
    // this.passwordControl = new FormControl<any>('', [])
    // this.confirmPasswordControl = new FormControl<any>('', [])

    this.registrationForm = this.fb.group({
      email: new FormControl<any>('',
        [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
      password: new FormControl<any>('', [Validators.required]),
      confirmPassword: new FormControl<any>('', [Validators.required])
    }, {validators: [passwordValidator]})
  }
}
