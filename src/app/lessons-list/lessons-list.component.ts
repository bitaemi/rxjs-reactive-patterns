import { Component, OnInit } from '@angular/core';
import { store } from '../event-bus-experiments/app-data';
import { Lesson } from '../shared/model/lesson';
import * as _ from 'lodash';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer<Lesson[]>, OnInit {
lessons: Lesson[] = [];

  ngOnInit() {
    console.log('LessonsListComponent is registered as an Observer ..');
    store.lessonsList$.subscribe(this);
  }

  next(data: Lesson[]) {
    console.log('LessonsListComponent received data ..');
    this.lessons = data;
  }

  error(err: any) {
    console.log('LessonsListComponent error ..');
  }

  complete() {
    console.log('LessonsListComponent completed ..');
  }

  toggleLessonViewed(lesson: Lesson) {
    console.log('toggling lesson ...');
    store.toggleLessonView(lesson);
  }

  delete(deleted: Lesson) {
    store.deleteLesson(deleted);
  }

}
