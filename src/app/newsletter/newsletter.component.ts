import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NewsletterService } from 'app/services/newsletter.service';
import { UserService } from 'app/services/user.service';

@Component({
    selector: 'app-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterComponent implements OnInit {

    firstname: string;
    constructor(
        private userService: UserService,
        private newsletterService: NewsletterService,
    ) {}

    ngOnInit(){
        this.userService.user$.subscribe(
            user => this.firstname = user.firstName
        )
    }

    subscribeToNewsletter(emailField) {
        this.newsletterService.subscribeToNewsletter(emailField.value)
        .subscribe(
            () => {
                alert('Subscription successful ...');
            },
            console.error
        );
    }
}
