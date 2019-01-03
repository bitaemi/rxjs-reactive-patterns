import {Component, OnInit} from '@angular/core';
import {testLessons} from "../shared/model/test-lessons";
import {Lesson} from "../shared/model/lesson";
import {store} from "./app-data";

@Component({
    selector: 'event-bus-experiments',
    templateUrl: './event-bus-experiments.component.html',
    styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {

    ngOnInit() {

        console.log('Top level component broadcasted all lessons ...');

        store.initializeLessonsList(<any>testLessons.slice(0));

        setTimeout(() => {

            const newLesson:any = {
                id: Math.random(),
                description: 'New lesson arriving from the backend'
            };

            store.addLesson(newLesson);

        }, 10000);

    }

    addLesson(lessonText: string) {
        const newLesson:any = {
            id: Math.random(),
            description: lessonText
        };

        store.addLesson(newLesson);
    }

}












