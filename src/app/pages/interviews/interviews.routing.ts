import { RouterModule, Routes } from '@angular/router';
import { InterviewsDetailsComponent, InterviewsListComponent } from './components';


const routes: Routes = [
     { path: 'details/:selector/:id', component: InterviewsDetailsComponent },
    { path: 'details/:selector/:id/:name/:emplId', component: InterviewsDetailsComponent },
    { path: 'list', component: InterviewsListComponent },
    { path: 'list/:filter', component: InterviewsListComponent },
    {
        path: '',
        redirectTo: 'list',
    },
];

export const routing = RouterModule.forChild(routes);
