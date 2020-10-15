import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent, CompanyDetailsComponent } from './components';
import { CompanyComponent } from '../company/company.component';

const routes: Routes = [
    {
        path: 'company',
        component: CompanyComponent,
        children: [
            { path: 'details', component: CompanyDetailsComponent },
            { path: 'r/details/:key', component: CompanyDetailsComponent },
            { path: 'r/details/:key/:section', component: CompanyDetailsComponent },
            { path: 'details/:id', component: CompanyDetailsComponent },
            { path: 'details/:id/:section', component: CompanyDetailsComponent },
            { path: 'list', component: CompanyListComponent },
            { path: 'list/:filter', component: CompanyListComponent },
            {
                path: '',
                redirectTo: 'list',
            },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
