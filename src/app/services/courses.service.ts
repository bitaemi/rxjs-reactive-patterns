import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
courses: any[];

  constructor(private db: AngularFireDatabase) {
    }

    findAllCourses() {
        this.db.list('courses')
        .do(console.log)
        .subscribe(
            data => this.courses = data
        );
    }

    findLastLessons() {
        this.db.list('lessons', {
            query: {
                orderByKey: true,
                limitToLast: 10
            }
        })
    }
}
