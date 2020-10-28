import { RouterModule, Routes } from '@angular/router';
import { RideAlongDetailsComponent } from './components/details/ride-along.details.component';
import { RideAlongListComponent } from './components/list/ride-along.list.component';


const routes: Routes = [
    { path: 'details/:id', component: RideAlongDetailsComponent },
    { path: 'r/details/:key', component: RideAlongDetailsComponent },
    { path: 'details/:selector/:id/:name', component: RideAlongDetailsComponent },
    { path: 'list', component: RideAlongListComponent },
    { path: 'list/:name', component: RideAlongListComponent },
    // { path: 'list/:filter', component: RideAlongComponent },
    {
        path: '',
        redirectTo: 'list',
    },
];

export const routing = RouterModule.forChild(routes);
