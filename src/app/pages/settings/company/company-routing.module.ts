
import {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {CompanyComponent} from './company.component';
import {CompanyListComponent} from './components/list/company-list.component';

const routes: Routes = [
  {path: 'company', component: CompanyComponent, children: [
      {path: 'list', component: CompanyListComponent },
      {path: '', redirectTo: 'list'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CompanyRoutingModule {
}
