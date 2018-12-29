import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {Course} from "../shared/model/course";
import {Lesson} from "../shared/model/lesson";
import * as _ from 'lodash';


@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Course;
  lessons: Lesson[];

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {


      route.params
          .subscribe( params => {

              const courseUrl = params['id'];

              this.db.list('courses', {
                  query: {
                      orderByChild: 'url',
                      equalTo: courseUrl
                  }
              })
              .map( data => data[0])
              .subscribe(data => {
                  this.course = data;

                  this.db.list('lessons', {
                          query: {
                              orderByChild: 'courseId',
                              equalTo: data.$key
                          }
                      })
                      .subscribe(lessons => this.lessons = lessons);
              });

          });

  }

  ngOnInit() {

  }

}
