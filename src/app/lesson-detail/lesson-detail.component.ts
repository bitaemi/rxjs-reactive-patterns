import {Component, OnInit, Input} from '@angular/core';
import {Lesson} from '../shared/model/lesson';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

  @Input()
  lesson: Lesson;

  constructor() { }

  ngOnInit() {
  }

}
