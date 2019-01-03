import { Component, OnInit } from '@angular/core';
import { UserService, UNKNOWN_USER } from 'app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
isLoggedIn$: Observable<boolean>;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.userService.user$.map(user => user !== UNKNOWN_USER );
  }

}
