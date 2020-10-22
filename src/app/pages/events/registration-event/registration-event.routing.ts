import { RouterModule, Routes } from '@angular/router';
import { RegistrationEventListComponent, RegistrationEventDetailsComponent } from './components';
import { RegistrationEventComponent } from './registration-event.component';

const routes: Routes = [
    {
        path: 'registration-event',
        component: RegistrationEventComponent,
        children: [
            { path: 'details', component: RegistrationEventDetailsComponent },
            { path: 'r/details/:key', component: RegistrationEventDetailsComponent },
            { path: 'details/:id', component: RegistrationEventDetailsComponent },
            { path: 'list', component: RegistrationEventListComponent },
            {
                path: '',
                redirectTo: 'list',
            },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
