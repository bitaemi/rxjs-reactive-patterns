
import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {LoginComponent} from './login/login.component';


export const routerConfig: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'course/:id',
        component: CourseDetailComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/home'
    }
];
