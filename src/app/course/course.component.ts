import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../shared/model/lesson';
import { CoursesHttpService } from '../services/courses-http.service';
import { Course } from '../shared/model/course';
import { LessonsPagerService } from 'app/services/lessons-pager.service';
import { ErrorMessagesService } from 'app/services/error-messages.service';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    providers: [
      LessonsPagerService,
      ErrorMessagesService
    ]
})
export class CourseComponent implements OnInit, OnDestroy {

    @Input()
    id: number;

    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;
    detail$: Observable<Lesson>;

    constructor(
        private coursesService: CoursesHttpService,
        private lessonsPager: LessonsPagerService,
        private messageService: ErrorMessagesService) {

    }

    ngOnInit() {
        this.course$ = this.coursesService.findCourseById(this.id);
        this.lessons$ = this.lessonsPager.lessonsPage$;

        this.lessonsPager.loadFirstPage(this.id)
        .subscribe(
            () => {},
            err => this.messageService.error('Could not load first page')
        );

    }

    previousLessonsPage() {
        this.lessonsPager.previous()
        .subscribe(
            () => {},
            err => this.messageService.error('Could not load previous page')
        );
    }

    nextLessonsPage() {
        this.lessonsPager.next()
        .subscribe(
            () => {},
            err => this.messageService.error('Could not load next page')
        );
    }

    selectedDetail(lesson: Lesson) {
        this.detail$ = this.coursesService.findLessonDetailById(lesson.url);
    }

    backToMaster() {
        this.detail$ = undefined;
    }

    ngOnDestroy() {
        console.log('destroying CourseComponent ...');
    }

}








