import { Routes } from '@angular/router';
import { CourseList } from './components/course-list/course-list';
import { StudentDashboard } from './components/student-dashboard/student-dashboard';
import { Header } from './layouts/header/header';
import { Footer } from './layouts/footer/footer';
import { Createcourse } from './components/createcourse/createcourse';
import { Mycoursedetails } from './components/mycoursedetails/mycoursedetails';
import { Login } from './authentication/login/login';
import { Signup } from './authentication/signup/signup';
import { AuthGuard } from './guards/auth-guard-guard';
import { CreatecourseS3 } from './components/createcourse-s3/createcourse-s3';
import { Homepage } from './components/homepage/homepage';

export const routes: Routes = [

    {
        path : 'login',
        component : Login
    },
    {
        path : 'signup',
        component : Signup
    },
    {
        path : 'courselist',
        component : CourseList,
        // canActivate : [AuthGuard],
        // data : { roles : ['INSTRUCTOR', 'STUDENT']}
    },
    {
    path: 'createcourse',
    component: Createcourse,
    canActivate: [AuthGuard],
    data: { roles: ['INSTRUCTOR'] } // only instructor can access
},
{
    path : 'createcourseS3',
    component : CreatecourseS3,
    canActivate : [AuthGuard],
    data : { roles : ['INSTRUCTOR']}
}
,
{
    path: 'studentdashboard',
    component: StudentDashboard,
    canActivate: [AuthGuard],
    data: { roles: ['STUDENT'] } // only student can access
}
,
    {
        path : 'mycoursedetails/:id',
        component : Mycoursedetails,
        canActivate : [AuthGuard]
    },
    {
        path : '',
        component : Homepage
    }
];
