import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public disableBtnFromLogin: boolean = true;
  public loginForm!: FormGroup;
  public noSuchUser: boolean = false;
  public noUserMessage: string = 'No such email found or password is wrong';
  public hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
    this.loginForm.valueChanges.subscribe(() => {this.noSuchUser = false})
  }

  public login(): any {
    if (this.loginForm.valid) {
      const payLoad = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      //console.log('login payload:', payLoad);
      let registeredUsers: any = []
      let authUsers: any = []

      if (localStorage.getItem('users')) {
        registeredUsers = JSON.parse(localStorage.getItem('users') || '')
        const authUser = registeredUsers.find(
          (user: any) => user.email === payLoad.email && user.password === payLoad.password);
        if (authUser) {
          //console.log('authUsers:', authUsers);
          //registeredUsers.push(payLoad)
          if (localStorage.getItem('session')) {
            authUsers = [JSON.parse(localStorage.getItem('session') || '')]
            //const existedUser =
            if (authUsers.find((user: any) => user.email === payLoad.email)) {
              return this.router.navigate(['/home'])
            }

          }
          //authUsers.push(authUser)
          localStorage.setItem('session', JSON.stringify(authUser))
          this.router.navigate(['/home'])
        }
        this.noSuchUser = true
      } else {this.noSuchUser = true}

      //const registeredUsers = JSON.parse(localStorage.getItem('users') || '');
      console.log('registeredUsers:', registeredUsers);
      //const authUsers = registeredUsers.find((user: any) => user.email === payLoad.email);

    }
  }
  public navToPage(pagePath: any): void {
    this.router.navigate(['/' + pagePath])
  }
  // public routerNavigate(): void {
  //   this.router.navigate(['/registration'])
  // }
}
