import {Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy} from '@angular/core';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';

@Component({
    selector: 'app-course-detail-header',
    templateUrl: './course-detail-header.component.html',
    styleUrls: ['./course-detail-header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class CourseDetailHeaderComponent {

    @Input()
    course: Course;

    @Input()
    lessons: Lesson[];
}
