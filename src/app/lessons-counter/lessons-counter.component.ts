import { Component, OnInit } from '@angular/core';
import { store } from '../event-bus-experiments/app-data';
import { Lesson } from '../shared/model/lesson';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements Observer<Lesson[]>, OnInit {
  lessonsCounter = 0;

  ngOnInit() {
    console.log('lessons counter componenent is registered as an observer ...');
    store.lessonsList$.subscribe(this);
  }

  next(data: Lesson[]) {
    console.log('counter component received data');
    this.lessonsCounter = data.length;
  }

  error(err: any) {
    console.log(err);
  }

  complete() {
    console.log('LessonsCountComponent completed ..');
  }
}
