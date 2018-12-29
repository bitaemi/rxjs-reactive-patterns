
import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CourseDetailComponent} from './course-detail/course-detail.component';


export const routerConfig: Routes = [
    {
        path: 'home',
        component: HomeComponent
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
