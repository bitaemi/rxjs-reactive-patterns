import { Component } from '@angular/core';
import { globalEventBus, Observer, ADD_NEW_LESSON, LESSONS_LIST_AVAILABLE } from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';

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
  }

  notify(data: Lesson[]) {
    console.log('LessonsListComponent received data ..');
    this.lessons = data;
  }

}
