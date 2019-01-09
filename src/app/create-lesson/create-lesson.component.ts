import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import * as Cookies from 'cookies-js';

@Component({
    selector: 'app-create-lesson',
    templateUrl: './create-lesson.component.html',
    styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {
private static readonly DRAFT_COOKIE = 'create-lesson-draft';
    form: FormGroup;

    constructor(private fb: FormBuilder) {

        this.form = this.fb.group({
            description: ['', Validators.required],
            url: ['', Validators.required],
            longDescription: ['']
        });

    }

    ngOnInit() {
        const draft = Cookies.get(CreateLessonComponent.DRAFT_COOKIE);
        // when we access component page and we already have the valueChanges saved in the cookie
        // we set those values into the form
        if (draft) {
            // deserialize the JSON string into in memory JavaScript Object
            this.form.setValue(JSON.parse(draft));
        }
        this.form.valueChanges
        .filter(() => this.form.valid)
        .do(validValue => Cookies.set(
            CreateLessonComponent.DRAFT_COOKIE,
            JSON.stringify(validValue)))
        .subscribe(console.log);
    }

}
