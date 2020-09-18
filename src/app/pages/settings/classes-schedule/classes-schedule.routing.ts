import { RouterModule, Routes } from '@angular/router';
import { ClassesScheduleListComponent, ClassesScheduleDetailsComponent } from './components';
import { ClassesScheduleComponent } from './classes-schedule.component';

const routes: Routes = [
    {
        path: 'classes-schedule',
        component: ClassesScheduleComponent,
        children: [
            { path: 'details', component: ClassesScheduleDetailsComponent },
            { path: 'r/details/:key', component: ClassesScheduleDetailsComponent },
            { path: 'details/:id', component: ClassesScheduleDetailsComponent },
            { path: 'list', component: ClassesScheduleListComponent },
            {
                path: '',
                redirectTo: 'list',
            },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
