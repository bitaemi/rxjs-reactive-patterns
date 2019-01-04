import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Lesson } from 'app/shared/model/lesson';
import { Http } from '@angular/http';

@Injectable(
  {
  providedIn: 'root'
})
export class LessonsPagerService {

  private static readonly PAGE_SIZE = 2;
  private subject = new BehaviorSubject<Lesson[]>([]);
  lessonsPage$: Observable<Lesson []> = this.subject.asObservable();
  currentPageNumber = 1;
  private courseId: number;

  constructor(private http: Http) {
    console.log('an instance of lessons-pager servicce was created');
   }

  loadFirstPage(courseId: number) {
    this.courseId = courseId;
    this.currentPageNumber = 1;

    this.loadPage(this.currentPageNumber);
  }

  previous() {
    this.currentPageNumber = (this.currentPageNumber > 1) ? (this.currentPageNumber -= 1) : this.currentPageNumber;
    this.loadPage(this.currentPageNumber);
  }

  next() {
    this.currentPageNumber++;
    this.loadPage(this.currentPageNumber);
  }

  loadPage(pageNumber: number) {
    this.http.get('/api/lessons', {
      params: {
        courseId: this.courseId,
        pageNumber,
        pageSize: LessonsPagerService.PAGE_SIZE
      }
    })
    .map(res => res.json().payload)
    .subscribe(
      lessons => this.subject.next(lessons)
    );

  }
}
