import { Routes, RouterModule } from '@angular/router';
import { TodoDashboardComponent } from './todo-dashboard.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: TodoDashboardComponent,
  },
];

export const routing: ModuleWithProviders<any> = RouterModule.forChild(routes);
