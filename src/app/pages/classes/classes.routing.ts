import { RouterModule, Routes } from '@angular/router';

import { ClassesListComponent } from './components/list/classes.list.component';
import { ClassesDetailsComponent } from './components/details/classes.details.component';

const routes: Routes = [
    { path: 'details/:id', component: ClassesDetailsComponent },
    { path: 'r/details/:key', component: ClassesDetailsComponent },
    { path: 'details/:selector/:id', component: ClassesDetailsComponent },
    { path: 'details/:selector/:id/:name', component: ClassesDetailsComponent },
    { path: 'list', component: ClassesListComponent },
    { path: 'list/:filter', component: ClassesListComponent },
    {
        path: '',
        redirectTo: 'list',
    },
];

export const routing = RouterModule.forChild(routes);
