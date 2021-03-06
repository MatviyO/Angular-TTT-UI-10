import { Routes, RouterModule } from '@angular/router';
import { NgModule} from '@angular/core';
import {PagesComponent} from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '',  redirectTo: 'todo-dashboard', pathMatch: 'prefix', },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule), },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule), },
      { path: 'todo-dashboard', loadChildren: () => import('./todo/todo-dashboard.module').then((m) => m.TodoDashboardModule), },
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule), },
      { path: 'tools', loadChildren: () => import('./tools/tools.module').then((m) => m.ToolsModule), },
      { path: 'classes', loadChildren: () => import('./classes/classes.module').then((m) => m.ClassesModule), },
      { path: 'ride-along', loadChildren: () => import('./ride-along/ride-along.module').then((m) => m.RideAlongModule), },
      { path: 'reports', loadChildren: () => import('./reports/report.module').then((m) => m.ReportModule), },
      { path: 'mentorship', loadChildren: () => import('./mentorship/mentorship.module').then((m) => m.MentorshipModule), },
      { path: 'interviews', loadChildren: () => import('./interviews/interviews.module').then((m) => m.InterviewsModule), },
      { path: 'job-tracking', loadChildren: () => import('./job-tracking/job-tracking.module').then((m) => m.JobTrackingModule), },
      { path: 'workforce-personal', loadChildren: () => import('./workforce-training/personal/workforce-personal.module')
          .then((m) => m.WorkforcePersonalModule), },
      { path: 'workforce-company', loadChildren: () => import('./workforce-training/company/workforce-company.module')
          .then((m) => m.WorkforceCompanyModule), },
      { path: 'housing-allowance', loadChildren: () => import('./housing-allowance/housing-allowance.module')
          .then((m) => m.HousingAllowanceModule), },
      { path: 'housing-transportation', loadChildren: () => import('./housing-transportation/housing-transportation.module')
          .then((m) => m.HousingTransportationModule), },
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
