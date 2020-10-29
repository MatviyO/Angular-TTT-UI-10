import { RouterModule, Routes } from '@angular/router';
import { JobTrackingListComponent, JobTrackingDetailsComponent } from './components';


const routes: Routes = [
    // { path: 'details/:id', component: JobTrackingDetailsComponent },
    { path: 'details', component: JobTrackingDetailsComponent },
    { path: 'r/details/:key', component: JobTrackingDetailsComponent },
    { path: 'details/:selector/:id', component: JobTrackingDetailsComponent },
    { path: 'details/:selector/:id/:name', component: JobTrackingDetailsComponent },
    // { path: 'details/:selector/:id/interview/:compId', component: JobTrackingDetailsComponent },
    { path: 'list', component: JobTrackingListComponent },
    { path: 'list/:filter', component: JobTrackingListComponent },
    {
        path: '',
        redirectTo: 'list',
    },
];

export const routing = RouterModule.forChild(routes);
