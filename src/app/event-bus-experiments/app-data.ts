
import * as _ from 'lodash';
import { Lesson } from '../shared/model/lesson';

export interface Observer {
    next(data: any);
}

export interface Observable {
    subscribe(obs: Observer);
    unsubscribe(obs: Observer);
}
interface Subject extends Observer, Observable {
    next(data: any);
}

class SubjectImplementation implements Subject {
    private observers: Observer[] = [];
    next(data: any) {
        this.observers.forEach(obs => obs.next(data));
    }
    subscribe(obs: Observer) {
        this.observers.push(obs);
    }

    unsubscribe(obs: Observer) {
        _.remove(this.observers, observer => observer === obs);
    }
}

const lessonsListSubject = new SubjectImplementation();

let lessons: Lesson[] = [];

export function initializeLessonsList(newList: Lesson[]) {
    lessons = _.cloneDeep(newList);
    lessonsListSubject.next(lessons);
}

class DataStore implements Observable {
    private lessons: Lesson[] = [];
    private lessonsListSubject = new SubjectImplementation();
    subscribe(obs: Observer) {
        this.lessonsListSubject.subscribe(obs);
        obs.next(this.lessons);
    }
    unsubscribe(obs: Observer) {this.lessonsListSubject.unsubscribe(obs);
    }
    initializeLessonsList(newList: Lesson[]) {
        this.lessons = _.cloneDeep(newList);
        this.broadcast();
    }

    addLesson(newLesson: Lesson) {
        this.lessons.push(_.cloneDeep(newLesson));
        this.broadcast();
    }

    broadcast() {
        this.lessonsListSubject.next(_.cloneDeep(this.lessons));
    }

    deleteLesson(deleted: Lesson) {
        _.remove(this.lessons,
        lesson => lesson.id === deleted.id);
        this.broadcast();
    }

    toggleLessonView(toggled: Lesson) {
        const lesson = _.find(this.lessons, lessonn => lessonn.id === toggled.id);
        lesson.completed = !lesson.completed;
        this.broadcast();
    }
}

export const store = new DataStore();
