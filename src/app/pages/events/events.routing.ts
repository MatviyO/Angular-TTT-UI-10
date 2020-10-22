import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events.component';

import { GraduationsComponent } from './graduations-event/graduations.component';
import { RegistrationEventComponent } from './registration-event/registration-event.component';
import { OrientationEventComponent } from './orientation-event/orientation-event.component';


const routes: Routes = [
    {
        path: '',
        component: EventsComponent,
        children: [
          { path: 'graduations', loadChildren: () => import('./graduations-event/graduations.module')
              .then((m) => m.GraduationsModule), },
          { path: 'registration-event', loadChildren: () => import('./registration-event/registration-event.module')
              .then((m) => m.RegistrationEventModule), },
          { path: 'orientation-event', loadChildren: () => import('./orientation-event/orientation-event.module')
              .then((m) => m.OrientationEventModule), },
          // { path: 'graduations', component: GraduationsComponent },
          // { path: 'registration-event', component: RegistrationEventComponent },
          // { path: 'orientation-event', component: OrientationEventComponent },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
