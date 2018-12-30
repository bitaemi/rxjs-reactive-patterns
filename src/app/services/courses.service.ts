import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Course } from 'app/shared/model/course';
import { Lesson } from 'app/shared/model/lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
courses: any[];

  constructor(private db: AngularFireDatabase) {
    }

    findAllCourses(): Observable<Course[]> {
        return this.db.list('courses')
        .first()
        .do(console.log);
    }

    findLastLessons(): Observable<Lesson[]> {
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
        return this.db.list('courses',
        {
            query: {
                orderByChild: 'url',
                equalTo: courseUrl
            }
        })
        .first()
        .map( data => data[0]);
    }

    findLessonsForCourse(courseId: string): Observable<Lesson[]> {
        return this.db.list('lessons', {
            query: {
                orderByChild: 'courseId',
                equalTo: courseId
            }
        })
    }
}
