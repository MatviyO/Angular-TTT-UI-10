import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
// import { NgaModule } from '../theme/nga.module';
import {CommonModule} from '@angular/common';
import {GoogleMapComponent, CollapseNoteComponent, AddNewSelectItemComponent, MessengerComponent, CalendarComponent} from './components/';
// import { AgmCoreModule } from '@agm/core';
import {ToolsService} from './data';
import {NgaModule} from '../theme/nga.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    // NgaModule,
    // AgmCoreModule,
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
