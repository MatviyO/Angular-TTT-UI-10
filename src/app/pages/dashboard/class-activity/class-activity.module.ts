import { NgModule } from '@angular/core';
import { routing } from './class-activity.routing';
import {TradesService} from '../../../core/data';



@NgModule({
    imports: [routing],
    declarations: [],
    providers: [TradesService],
})

export class ClassActivityModule {

}
