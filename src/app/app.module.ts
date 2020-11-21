import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import {UsersService} from './services/users.service';
import {MatButtonModule} from '@angular/material/button';
import {AppErrorHandler} from './common/AppErrorHandler';
import { UserComponent } from './components/user/user.component';
import { JwtModule } from '@auth0/angular-jwt';
import {authInterceptorProviders} from './services/interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    JwtModule.forRoot(
      {
        config: {
          tokenGetter: function  tokenGetter(): any {
            return     localStorage.getItem('access_token'); },
        }
      }
    )
  ],
  providers: [UsersService,
             {provide: ErrorHandler, useClass: AppErrorHandler },
              authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
