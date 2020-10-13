import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './components';
import { CompanyComponent } from '../company/company.component';

const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent,
    children: [
      { path: 'list', component: CompanyListComponent },
      { path: 'list/:filter', component: CompanyListComponent },
      {
        path: '',
        redirectTo: 'list',
      },
      { path: '**', redirectTo: 'login' }
    ],
  },
];

export const routing = RouterModule.forChild(routes);
