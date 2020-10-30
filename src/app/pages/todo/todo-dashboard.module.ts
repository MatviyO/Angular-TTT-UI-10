import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule } from '@angular/forms';
import { routing } from './todo-dashboard.routing';
import { TodoDashboardComponent } from './todo-dashboard.component';
import { CircleChartComponent } from './components/circle-chart/circle-chart.component';
import { CircleChartToolsComponent } from './components/circle-chart-tools/circle-chart-tools.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { TodoComponent } from './components/todo/todo.component';
import { Common_Module } from '../../common/common.module';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {ClassesService, ProfileService, ToolsService, TriggerHelper} from '../../core/data';


@NgModule({
    imports: [
        CommonModule,
        routing,
        NgaModule,
        FormsModule,
        Common_Module,
        NguiAutoCompleteModule,
    ],
    declarations: [
        TodoDashboardComponent,
        CircleChartComponent,
        CircleChartToolsComponent,
        PieChartComponent,
        TodoComponent,
    ],

    providers: [
        ToolsService,
        ProfileService,
        ClassesService,
        TriggerHelper,
    ],
})
export class TodoDashboardModule { }
