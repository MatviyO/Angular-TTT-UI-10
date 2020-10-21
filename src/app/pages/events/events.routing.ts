import { Routes, RouterModule } from '@angular/router';

// import { GraduationsComponent } from './graduations-event/graduations.component';
import { EventsComponent } from './events.component';
import { RegistrationEventComponent } from './registration-event/registration-event.component';
import { OrientationEventComponent } from './orientation-event/orientation-event.component';
import {GraduationsEventComponent} from './graduations-event/graduations-event.component';


const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
      { path: 'graduations', component: GraduationsEventComponent },
      { path: 'registration-event', component: RegistrationEventComponent },
      { path: 'orientation-event', component: OrientationEventComponent },

    ],
  },
];

export const routing = RouterModule.forChild(routes);
