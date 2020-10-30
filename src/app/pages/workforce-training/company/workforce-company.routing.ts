import {RouterModule, Routes} from '@angular/router';
import {WorkforceCompanyListComponent} from '../company/components/list';

const routes: Routes = [
  {path: 'list', component: WorkforceCompanyListComponent},
  {path: 'list/:filter', component: WorkforceCompanyListComponent},
  {
    path: '',
    redirectTo: 'list',
  },
];

export const routing = RouterModule.forChild(routes);
