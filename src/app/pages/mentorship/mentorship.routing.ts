import { RouterModule, Routes } from '@angular/router';
import { MentorshipListComponent, MentorshipDetailsComponent } from './components';


const routes: Routes = [
    { path: 'details/:id', component: MentorshipDetailsComponent },
    { path: 'r/details/:key', component: MentorshipDetailsComponent },
    { path: 'details/:selector/:id/:name', component: MentorshipDetailsComponent },
    { path: 'list', component: MentorshipListComponent },
    { path: 'list/:filter', component: MentorshipListComponent },
    {
        path: '',
        redirectTo: 'list',
    },
];

export const routing = RouterModule.forChild(routes);
