import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';
import * as _ from 'lodash';
import {CoursesService} from '../services/courses.service';
import {NewsletterService} from '../services/newsletter.service';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course$: Observable<Course[]>;
  lessons$: Observable<Lesson[]>;
  firstname;
  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService,
              private newsletterService: NewsletterService,
              private userService: UserService) {

  }

  ngOnInit() {
    // this.route.params
    // .subscribe( params => {

    //     const courseUrl = params['id'];
    //     this.course$ = this.route.params.switchMap(params => this.coursesService.findCourseByUrl(params['id']))

    //     this.coursesService.findCourseByUrl(courseUrl)
    //     .subscribe(data => {
    //         let course = data;

    //         this.coursesService.findLessonsForCourse(course.id)
    //           .subscribe(lessons => this.lessons$ = lessons);
    //     });

    // });
  }
  onSubscribe(email: string) {
      this.newsletterService.subscribeToNewsletter(email)
          .subscribe(
              () => {
                  alert('Subscription successful ...');
              },
              console.error
          );
  }

}
