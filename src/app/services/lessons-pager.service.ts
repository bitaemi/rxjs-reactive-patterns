import { Injectable, OnDestroy } from '@angular/core';
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

  loadFirstPage(courseId: number): Observable<any> {
    this.courseId = courseId;
    this.currentPageNumber = 1;

    return this.loadPage(this.currentPageNumber);
  }

  previous(): Observable<any> {
    this.currentPageNumber = (this.currentPageNumber > 1) ? (this.currentPageNumber -= 1) : this.currentPageNumber;
    return this.loadPage(this.currentPageNumber);
  }

  next(): Observable<any> {
    this.currentPageNumber++;
    return this.loadPage(this.currentPageNumber);
  }

  loadPage(pageNumber: number): Observable<any> {
    return this.http.get('/api/lessons', {
      params: {
        courseId: this.courseId,
        pageNumber,
        pageSize: LessonsPagerService.PAGE_SIZE
      }
    })
    .map(res => res.json().payload)
    .do(
      lessons => this.subject.next(lessons)
    )
    .publishLast().refCount();

  }
}
