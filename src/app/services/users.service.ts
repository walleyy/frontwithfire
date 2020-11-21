import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {AppError} from '../common/AppError';
import {NotFoundError} from '../common/NotFoundError';
import {BadInputError} from '../common/BadInputError';
import {Data} from '../components/admin/admin.component';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
apiRoot = 'https://jsonplaceholder.typicode.com';
posts: any;

  constructor(private http: HttpClient) {}
// (private http: HttpClient, private apiRoot: string)
// getPost(): any {
//     this.http.get<Data>(`${this.apiRoot}/posts`).subscribe(response => this.posta = {...response});
//     return this.posta;
// }
  getPost(): any{
    return this.http.get(`${this.apiRoot}/posts`);
  }

  makePost(payload): any{
   return  this.http.post(`${this.apiRoot}/posts`, JSON.stringify(payload))
     .pipe(
       retry(2),
     catchError(async (err) => {
       if ( err.status === 400 ){
         return new BadInputError(err);
       }
       return  new AppError(err);
     }));
  }
  updatePost(data): any {
    return this.http.patch(this.apiRoot + '/posts/' + data.id, JSON.stringify({isRead: true})).
    pipe(retry(2),
      catchError(async (err) => {
        if ( err.status === 404 ){
          return new NotFoundError(err);
        }else {
          alert('unexpected error has occurred');
          console.log(err); }}));
  }
  deletePost(data): any {
    return this.http.delete(this.apiRoot + '/posts/' + data.id)
      .pipe(retry(1),
        catchError(async (err) => {
          if ( err.status === 404 ){
      return new NotFoundError(err);
    }else {
            alert('unexpected error has occurred');
            console.log(err); }}));
  }

}
