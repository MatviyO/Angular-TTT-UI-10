import { RouterModule, Routes } from '@angular/router';
import { WorkforcePersonalListComponent, WorkforcePersonalDetailsComponent } from './components';


const routes: Routes = [
    { path: 'details/:id', component: WorkforcePersonalDetailsComponent },
    { path: 'details/:selector/:id', component: WorkforcePersonalDetailsComponent },
    { path: 'details/:selector/:id/:name', component: WorkforcePersonalDetailsComponent },
    { path: 'list', component: WorkforcePersonalListComponent },
    { path: 'list/:filter', component: WorkforcePersonalListComponent },
    {
        path: '',
        redirectTo: 'list',
    },
];

export const routing = RouterModule.forChild(routes);
