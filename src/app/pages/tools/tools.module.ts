import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { ToolsListComponent, ToolsDetailsComponent } from './components';
import { routing } from './tools.routing';
import {ToolsService} from '../../core/data';
import {Common_Module} from '../../common';
import {NgxUploaderModule} from 'ngx-uploader';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';


@NgModule({
    providers: [
        ToolsService,
    ],
    imports: [
        CommonModule,
        Common_Module,
        FormsModule,
        NgaModule,
        routing,
        NgxUploaderModule,
        NguiAutoCompleteModule,
    ],
    declarations: [
        ToolsListComponent,
        ToolsDetailsComponent,
    ],
})
export class ToolsModule {
}
