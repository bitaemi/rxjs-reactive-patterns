import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of'
import { ErrorMessagesService } from 'app/services/error-messages.service';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css'],
})
export class ErrorMessagesComponent implements OnInit {

  errors$: Observable<string[]> = Observable.of(['testing 1,2,3']);
  constructor(private messagesService: ErrorMessagesService) {
  }

  ngOnInit() {
    this.errors$ = this.messagesService.errors$;
  }

  close() {
    this.messagesService.error();

  }

}
