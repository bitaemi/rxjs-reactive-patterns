import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationStart, RoutesRecognized, Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  loading$: Observable<boolean>;
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.loading$ = this.router.events
    .map( event => true);
  }

}
