import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(name, password): Observable<any>{
   return this.http.post(AUTH_API, JSON.stringify({name, password}), httpOptions);
  }

  register(email: string, password: string): any {
    return this.http.post(AUTH_API, {email, password}, httpOptions);

  }

//    public get isLoggedIn(): boolean{
//     return localStorage.getItem('access_token') !==  null;
//   }
//
//   get currentUser(): any {
//    const token = localStorage.getItem('token');
//    if (!token){
//    return null;
//    }
//    }
//
//   logout(): any {
// localStorage.removeItem('token');
//   }
}
