import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';

import { HousingAllowanceListComponent, HousingAllowanceDetailsComponent } from './components';
import { routing } from './housing-allowance.routing';
import {Common_Module} from '../../common';
import {HousingAllowanceService} from '../../core/data';

@NgModule({
    providers: [
        HousingAllowanceService,
    ],
    imports: [
        CommonModule,
        Common_Module,
        FormsModule,
        NgaModule,
        routing,
    ],
    declarations: [
        HousingAllowanceListComponent,
        HousingAllowanceDetailsComponent,
    ],
})
export class HousingAllowanceModule {

}
