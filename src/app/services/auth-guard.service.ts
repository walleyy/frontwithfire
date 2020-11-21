import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {LoginComponent} from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router, private loginSheet: LoginComponent) { }
  // tslint:disable-next-line:max-line-length
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 if (this.loginSheet.isLoggedIn){
   return true;
 }
 this.router.navigate(['/login']).then(r => { this.loginSheet.requestReset();
                                              console.log(r); });
  }
}
