import {Component, OnInit} from '@angular/core';
import { Course } from '../shared/model/course';
import { Lesson } from '../shared/model/lesson';
import { CoursesService } from '../services/courses.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    courses: Course[];
    latestLessons: Lesson[];

    constructor(private coursesService: CoursesService) {

    }

    ngOnInit() {
        this.coursesService.findAllCourses()
        .subscribe(
            data => this.courses = data
        );

        this.coursesService.findLastLessons()
        .subscribe(
            data => this.latestLessons = data
        );

    }

}
