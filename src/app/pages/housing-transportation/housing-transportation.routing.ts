import { RouterModule, Routes } from '@angular/router';
import { HousingTransportationListComponent, HousingTransportationDetailsComponent } from './components';


const routes: Routes = [
    { path: 'details/:userId/:name/:id/:participantId', component: HousingTransportationDetailsComponent },
    { path: 'list/:userName/:userId', component: HousingTransportationListComponent },
    { path: 'list', component: HousingTransportationListComponent },
    {
        path: '',
        redirectTo: 'list',
    },
];

export const routing = RouterModule.forChild(routes);
