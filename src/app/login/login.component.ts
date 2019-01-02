import {Component, OnInit} from '@angular/core';
import { UserService } from 'app/services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private userService: UserService,
        private router: Router
        ) { }

    ngOnInit() {

    }

    login(email: string, password: string) {
    this.userService.login(email, password)
    .subscribe(
        () => {
            this.router.navigateByUrl('/home');
            alert('Logged in succesfully');
        },
        err => console.error(err)
    );
    }

}
