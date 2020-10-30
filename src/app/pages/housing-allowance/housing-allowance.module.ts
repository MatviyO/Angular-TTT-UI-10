import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';
import { Common_Module } from '@ttt/common';
import { HousingAllowanceService } from '@ttt/core/data';
import { HousingAllowanceListComponent, HousingAllowanceDetailsComponent } from './components';
import { routing } from './housing-allowance.routing';

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
