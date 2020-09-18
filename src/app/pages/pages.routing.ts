import { Routes, RouterModule } from '@angular/router';
import { NgModule} from '@angular/core';
import {PagesComponent} from './pages.component';

// import { LoginComponent } from './login/login.component';
// import { AuthenticationService } from '@ttt/core';

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  {
    path: '',
    component: PagesComponent,
    // canActivate: [AuthenticationService],
    children: [
      { path: '',  redirectTo: 'dashboard', pathMatch: 'full', },
      { path: 'dashboard', loadChildren: () => import('../pages/dashboard/dashboard.module').then((m) => m.DashboardModule), },
      { path: 'settings', loadChildren: () => import('../pages/settings/settings.module').then((m) => m.SettingsModule), },

      // { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      //   { path: 'todo-dashboard', loadChildren: './todo/todo-dashboard.module#TodoDashboardModule' },
      // { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
      // { path: 'tools', loadChildren: './tools/tools.module#ToolsModule' },
      // { path: 'classes', loadChildren: './classes/classes.module#ClassesModule' },
      // { path: 'ride-along', loadChildren: './ride-along/ride-along.module#RideAlongModule' },
      // { path: 'mentorship', loadChildren: './mentorship/mentorship.module#MentorshipModule' },
      // { path: 'interviews', loadChildren: './interviews/interviews.module#InterviewsModule' },
      // { path: 'job-tracking', loadChildren: './job-tracking/job-tracking.module#JobTrackingModule' },
      // tslint:disable-next-line:max-line-length
      // { path: 'workforce-personal', loadChildren: './workforce-training/personal/workforce-personal.module#WorkforcePersonalModule' },
      // { path: 'workforce-company', loadChildren: './workforce-training/company/workforce-company.module#WorkforceCompanyModule' },
      // { path: 'housing-allowance', loadChildren: './housing-allowance/housing-allowance.module#HousingAllowanceModule' },
      // tslint:disable-next-line:max-line-length
      // { path: 'housing-transportation', loadChildren: './housing-transportation/housing-transportation.module#HousingTransportationModule' },
      // { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
      // { path: 'events', loadChildren: './events/events.module#EventsModule' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PageRoutingModule {
}