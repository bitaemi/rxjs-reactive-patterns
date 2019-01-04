import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'app/shared/model/user';
import { Http, Headers } from '@angular/http';

export const UNKNOWN_USER: User = {
  firstName: 'Unknown'
};

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class UserService {
  private subject = new BehaviorSubject(UNKNOWN_USER);

  user$: Observable<User> = this.subject.asObservable();
  constructor(private http: Http) { }

  login(email: string, password: string): Observable<User> {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/login', {email, password}, {headers})
    .map( response => response.json())
    .do(user => console.log(user))
    .do(user => this.subject.next(user))
    .publishLast().refCount();
  }
}
