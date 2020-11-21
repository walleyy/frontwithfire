import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private  route: ActivatedRoute, public authService: AuthService,
              private token: TokenStorageService, public app: AppComponent) { }
  identity: number;
  currentUser: any;

  ngOnInit(): void {
    this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(
      param => {
        const id = +param.getAll('id');
        this.identity = id;
        console.log(id);
      }
    );
    this.currentUser = this.token.getUser();
  }
}
