import { Component, OnInit } from '@angular/core';
import { Observer, store } from '../event-bus-experiments/app-data';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'app-lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements Observer, OnInit {
  lessonsCounter = 0;

  ngOnInit() {
    console.log('lessons counter componenent is registered as an observer ...');
    store.subscribe(this);
  }

  next(data: Lesson[]) {
    console.log('counter component received data');
    this.lessonsCounter = data.length;
  }
}
