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
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule), },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule), },
      // { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      //   { path: 'todo-dashboard', loadChildren: './todo/todo-dashboard.module#TodoDashboardModule' },
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule), },
      { path: 'tools', loadChildren: () => import('./tools/tools.module').then((m) => m.ToolsModule), },
      { path: 'classes', loadChildren: () => import('./classes/classes.module').then((m) => m.ClassesModule), },
      { path: 'ride-along', loadChildren: () => import('./ride-along/ride-along.module').then((m) => m.RideAlongModule), },
      { path: 'reports', loadChildren: () => import('./reports/report.module').then((m) => m.ReportModule), },
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
      { path: 'events', loadChildren: () => import('../pages/events/events.module').then((m) => m.EventsModule), },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PageRoutingModule {
}
