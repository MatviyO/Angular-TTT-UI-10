import { RouterModule, Routes } from '@angular/router';
import { ProfileListComponent } from './components/list/list.component';
import { ProfileDetailsComponent } from './components/details/details.component';

const routes: Routes = [
    { path: 'details', component: ProfileDetailsComponent },
    { path: 'r/details/:key', component: ProfileDetailsComponent },
    { path: 'r/details/:key/:section', component: ProfileDetailsComponent },
    { path: 'details/:id', component: ProfileDetailsComponent },
    { path: 'list', component: ProfileListComponent },
    { path: 'list/:filter', component: ProfileListComponent },
    { path: 'list/:filter', component: ProfileListComponent },
    {
        path: '',
        redirectTo: 'list',
    },
];

export const routing = RouterModule.forChild(routes);
