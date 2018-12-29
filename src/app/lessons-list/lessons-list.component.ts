import {Component, OnInit} from '@angular/core';
import {Lesson} from '../shared/model/lesson';
import * as _ from 'lodash';
import {store} from '../event-bus-experiments/app-data';
import {Observer} from 'rxjs';

@Component({
    selector: 'app-lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer<Lesson[]>, OnInit {

    lessons: Lesson[] = [];

    ngOnInit() {
        store.lessonsList$.subscribe(this);
    }

    next(data: Lesson[]) {
        console.log('Lessons list component received data ..');
        this.lessons = data;
    }

    error(err: any)  {
        console.error(err);
    };


    complete() {
        console.log('completed');
    };

    toggleLessonViewed(lesson: Lesson) {
        console.log('toggling lesson ...');
        store.toggleLessonViewed(lesson);
    }

    delete(deleted: Lesson) {
        store.deleteLesson(deleted);
    }



}



