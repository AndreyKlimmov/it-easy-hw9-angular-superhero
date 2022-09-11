import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  public login() {
    if (this.loginForm.valid) {
      const payLoad = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      console.log('login payload:', payLoad);
      const registeredUsers = [JSON.parse(localStorage.getItem('user') || '')];
      console.log('registeredUsers:', registeredUsers);
      const authUsers = registeredUsers.find((user: any) => user.email === payLoad.email);
      if (authUsers) {
        console.log('authUsers:', authUsers);
        localStorage.setItem('session', JSON.stringify(authUsers))
        this.router.navigate(['/home'])
      }
    }
  }
}
