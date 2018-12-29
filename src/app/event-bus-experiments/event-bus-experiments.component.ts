import { Component, OnInit } from '@angular/core';
import { testLessons } from '../shared/model/test-lessons';
import { Lesson } from '../shared/model/lesson';
import { store } from './app-data';

@Component({
  selector: 'app-event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {

  lessons: Lesson[] = [];
  constructor() { }

  ngOnInit() {

    console.log('Top level component broadcasted all lessons');
    store.initializeLessonsList(<any>testLessons.slice(0));

    setTimeout(() => {
     const newLesson: any = {
        id: Math.random(),
        description: 'New lesson arriveing from the backend ...'
    };
    store.addLesson(newLesson);
    }, 1000);
  }

  addLesson(lessonText: string) {
    const newLesson: any = {
      id: Math.random(),
      description: lessonText
    };
    store.addLesson(newLesson);
  }

}
