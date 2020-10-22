import { RouterModule, Routes } from '@angular/router';
import { GraduationsListComponent, GraduationDetailsComponent } from './components';
import { GraduationsComponent } from './graduations.component';

const routes: Routes = [
    {
        path: 'graduations',
        component: GraduationsComponent,
        children: [
            { path: 'details', component: GraduationDetailsComponent },
            { path: 'r/details/:key', component: GraduationDetailsComponent },
            { path: 'details/:id', component: GraduationDetailsComponent },
            { path: 'list', component: GraduationsListComponent },
            {
                path: '',
                redirectTo: 'list',
            },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
