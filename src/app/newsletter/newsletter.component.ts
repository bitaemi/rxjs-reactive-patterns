import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NewsletterService } from 'app/services/newsletter.service';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterComponent implements OnInit {

    firstName$: Observable<string>;

    constructor(
        private userService: UserService,
        private newsletterService: NewsletterService,
    ) {}

    ngOnInit() {
        this.firstName$ = this.userService.user$.map(
            user => user.firstName
        )
    }

    subscribeToNewsletter(emailField) {
        this.newsletterService.subscribeToNewsletter(emailField.value)
        .subscribe(
            () => {
                emailField.value = '';
                alert('Subscription successful ...');
            },
            console.error
        );
    }
}
