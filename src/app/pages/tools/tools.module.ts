import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { ToolsListComponent, ToolsDetailsComponent } from './components';
import { routing } from './tools.routing';
// import { FileDropModule } from 'ngx-file-drop';
import {ToolsService} from '../../core/data';
import {Common_Module} from '../../common';
import {NgxUploaderModule} from 'ngx-uploader';


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
        // FileDropModule,
        // FileUploader,
    ],
    declarations: [
        ToolsListComponent,
        ToolsDetailsComponent,
    ],
})
export class ToolsModule {
}
