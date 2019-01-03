import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Course } from '../shared/model/course';
import { Observable } from 'rxjs';
import { Lesson } from '../shared/model/lesson';

@Injectable()
export class CoursesService {

  constructor(private db: AngularFireDatabase) {

  }

  findAllCourses(): Observable<Course[]> {
      return this.db.list('courses')
          .first()
          .do(console.log);
  }

  findLatestLessons(): Observable<Lesson[]> {
      return this.db.list('lessons', {
          query: {
              orderByKey: true,
              limitToLast: 10
          }
      })
      .first()
      .do(console.log);
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
      return this.db.list('courses', {
          query: {
              orderByChild: 'url',
              equalTo: courseUrl
          }
      })
      .map( data => data[0])
      .first();
  }

  findLessonsForCourse(courseId: string): Observable<Lesson[]> {
      return <any>this.db.list('lessons', {
          query: {
              orderByChild: 'courseId',
              equalTo: courseId
          }
      })
      .first();
  }
}










