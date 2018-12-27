import { Component } from '@angular/core';
import { globalEventBus, Observer, ADD_NEW_LESSON, LESSONS_LIST_AVAILABLE } from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';
import * as _ from 'lodash';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer {
lessons: Lesson[] = [];
  constructor() {
    console.log('LessonsListComponent is registered as an Observer ..');
    globalEventBus.registerObserver(LESSONS_LIST_AVAILABLE, this);
    globalEventBus.registerObserver(ADD_NEW_LESSON, {
      notify: lessonText => {
        this.lessons.push({
          id: Math.random(),
          description: lessonText
        });
      }
    });
  }

  notify(data: Lesson[]) {
    console.log('LessonsListComponent received data ..');
    this.lessons = data;
  }

  toggleLessonView(lesson: Lesson) {
    console.log('toggling lesson ...');
    lesson.completed = !lesson.completed;

  }

  delete(deleted: Lesson) {
    _.remove(this.lessons,
    lesson => lesson.id === deleted.id);
  }

}
