import { RouterModule, Routes } from '@angular/router';
import { HousingAllowanceListComponent, HousingAllowanceDetailsComponent } from './components';


const routes: Routes = [
    { path: 'details/:id', component: HousingAllowanceDetailsComponent },
    { path: 'details/:selector/:id', component: HousingAllowanceDetailsComponent },
    { path: 'details/:selector/:id/:name', component: HousingAllowanceDetailsComponent },
    { path: 'list', component: HousingAllowanceListComponent },
    { path: 'list/:filter', component: HousingAllowanceListComponent },
    {
        path: '',
        redirectTo: 'list',
    },
];

export const routing = RouterModule.forChild(routes);
