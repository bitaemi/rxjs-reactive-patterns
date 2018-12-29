import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
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


    }

}
