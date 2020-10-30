import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../../theme/nga.module';
import { MilitaryStatsComponent } from './military-stats.component';

@NgModule({
    imports: [NgaModule, CommonModule],
    exports: [MilitaryStatsComponent],
    declarations: [MilitaryStatsComponent],
})

export class MilitaryStatsModule { }
