import { RouterModule, Routes } from '@angular/router';
import { OrientationEventComponent } from './orientation-event.component';
import { OrientationEventListComponent } from './components/list/orientation-event.list.component';
import { OrientationEventDetailsComponent } from './components/details/orientation-event.details.component';

const routes: Routes = [
    {
        path: 'orientation-event',
        component: OrientationEventComponent,
        children: [
            { path: 'details', component: OrientationEventDetailsComponent },
            { path: 'r/details/:key', component: OrientationEventDetailsComponent },
            { path: 'details/:id', component: OrientationEventDetailsComponent },
            { path: 'list', component: OrientationEventListComponent },
            {
                path: '',
                redirectTo: 'list',
            },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
