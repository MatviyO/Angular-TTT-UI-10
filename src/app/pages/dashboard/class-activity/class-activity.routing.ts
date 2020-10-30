import { RouterModule, Routes } from '@angular/router';
import { ClassActivityComponent } from './class-activity.component';
import { ClassActivityListComponent } from './components/class-activity-list.component';

const routes: Routes = [
    {
        path: 'class-activity',
        component: ClassActivityComponent,
        children: [
            { path: '', component: ClassActivityListComponent },
            { path: ':userName/:userId', component: ClassActivityListComponent },
            { path: ':classId', component: ClassActivityListComponent },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
