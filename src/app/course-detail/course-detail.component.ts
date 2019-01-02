import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';
import * as _ from 'lodash';
import {CoursesService} from '../services/courses.service';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService,
              private userService: UserService) {
  }

  ngOnInit() {
      this.course$ = this.route.params
      .switchMap( params => this.coursesService.findCourseByUrl(params['id']))
      .first()
      .publishLast().refCount();

      this.lessons$ = this.course$
      .switchMap(course => this.coursesService.findLessonsForCourse(course.id));
  }

  loginAsJohn() {
    this.userService.login('john@gmail.com', 'test123').subscribe();

}

}
