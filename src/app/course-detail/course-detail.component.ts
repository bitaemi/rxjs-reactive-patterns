import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { UserService } from 'app/services/user.service';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  constructor(private route: ActivatedRoute,
    private userService: UserService) {
  }

  ngOnInit() {
    this.course$ = this.route.data.map(data => data['detail'][0]);
    this.lessons$ = this.route.data.map(data => data['detail'][1]);
  }

  loginAsJohn() {
    this.userService.login('john@gmail.com', 'test123').subscribe();

}

}
