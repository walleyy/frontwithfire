import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean;
  roles: any;
  loginForm: FormGroup;
  loginData;
  submitted = false;
  isAdmin = false;
  isLoginFailed: boolean;
  public errorMessage: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router, private tokenStorage: TokenStorageService) {}


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      admin: ['', [ Validators.minLength(4)]]
    });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  // convenience getter for easy access to form fields, kwa template
  get f(): any {
    return this.loginForm.controls;
  }

  signing(value): any  {
this.submitted = true;

// stop when form is invalid
if (this.loginForm.invalid){
      return this.loginForm.reset();
    }

if (value.name && value.password){
  this.authService.login(value.name, value.password).
  subscribe(
    result => {
      if ( result ){
        // this.router.navigate(['/user:id']).then(r => {console.log(r); });
        this.tokenStorage.saveToken(result.accessToken);
        this.tokenStorage.saveUser(result);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      }else {
        this.submitted = false;
      }
    },
    err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    }
  );
}

if (this.roles === 'admin'){
  this.router.navigate(['/admin']).then(r => { });
}

  }

  // toggle(): boolean {
  //   console.log(this.isAdmin);
  //   return this.isAdmin = !this.isAdmin;
  // }
  public requestReset(): any{
    return this.loginForm.reset();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
