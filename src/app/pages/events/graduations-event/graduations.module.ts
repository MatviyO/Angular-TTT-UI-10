import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../../theme/nga.module';
import { GraduationsService } from './graduations.service';
import { GraduationsListComponent, GraduationDetailsComponent } from './components';
import { GraduationsComponent } from './graduations.component';
import { routing } from './graduations.routing';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {Common_Module} from '../../../common';

@NgModule({
    imports: [
        CommonModule,
        NgaModule,
        Common_Module,
        routing,
        FormsModule,
        NguiAutoCompleteModule,
    ],
    declarations: [
        GraduationsComponent,
        GraduationsListComponent,
        GraduationDetailsComponent,
    ],
    providers: [
        GraduationsService,
    ],
})
export class GraduationsModule {

}
