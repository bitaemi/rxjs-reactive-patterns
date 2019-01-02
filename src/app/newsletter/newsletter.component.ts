import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent {

    @Input()
    firstName: string;

    @Output()
    subscribe = new EventEmitter();

    subscribeToNewsletter(emailField) {
        this.subscribe.emit(emailField.value);
        emailField.value = '';
    }
}
