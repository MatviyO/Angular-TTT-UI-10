import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {GoogleMapComponent, CollapseNoteComponent, AddNewSelectItemComponent, MessengerComponent, CalendarComponent} from './components/';
import {ToolsService} from './data';
import {NgaModule} from '../theme/nga.module';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    AgmCoreModule,
  ],
  declarations: [
    GoogleMapComponent,
    CollapseNoteComponent,
    AddNewSelectItemComponent,
    MessengerComponent,
    CalendarComponent,
  ],
  exports: [
    GoogleMapComponent,
    CollapseNoteComponent,
    AddNewSelectItemComponent,
    MessengerComponent,
    CalendarComponent,
  ],
  providers: [
    ToolsService,
  ],
})
export class CoreModule {

}
