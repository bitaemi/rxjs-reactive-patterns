import { Component, OnInit } from '@angular/core';
import { Observer, store } from '../event-bus-experiments/app-data';
import { Lesson } from '../shared/model/lesson';
import * as _ from 'lodash';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer, OnInit {
lessons: Lesson[] = [];

  ngOnInit() {
    console.log('LessonsListComponent is registered as an Observer ..');
    store.subscribe(this);
  }

  next(data: Lesson[]) {
    console.log('LessonsListComponent received data ..');
    this.lessons = data;
  }

  toggleLessonViewed(lesson: Lesson) {
    console.log('toggling lesson ...');
    store.toggleLessonView(lesson);
  }

  delete(deleted: Lesson) {
    store.deleteLesson(deleted);
  }

}
