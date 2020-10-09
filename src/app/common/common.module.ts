import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxUploaderModule } from 'ngx-uploader';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
// import { FileDropModule } from 'ngx-file-drop';

import { FormsModule } from '@angular/forms';
import {  InfoBoxComponentComponent, ProgressLoadDataComponent,
        EditorComponent, AddNewItemComponent, FileUploader, SelectCountryStateComponent } from './Components/';
import { ScrollSpyDirective, ContainerDirective, AddNewItemDirective, VisabilitySsnDirective } from './directives';
// import { MemoryCache, MemoryDataStorage } from './utils';
import { CallbackPipe, OrderByPipe } from './pipes';
import { EnumKeyValueListPipe } from './pipes/keyValue.pipe';




@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NguiAutoCompleteModule,
        NgxUploaderModule,
        // FileDropModule,
    ],

    declarations: [
        SelectCountryStateComponent,
        InfoBoxComponentComponent,
        ProgressLoadDataComponent,
        EditorComponent,
        ScrollSpyDirective,
        ContainerDirective,
        AddNewItemDirective,
        VisabilitySsnDirective,
        AddNewItemComponent,
        OrderByPipe,
        EnumKeyValueListPipe,
        CallbackPipe,
        FileUploader,
    ],
    exports: [
        SelectCountryStateComponent,
        InfoBoxComponentComponent,
        ProgressLoadDataComponent,
        EditorComponent,
        ScrollSpyDirective,
        ContainerDirective,
        AddNewItemDirective,
        VisabilitySsnDirective,
        AddNewItemComponent,
        OrderByPipe,
        EnumKeyValueListPipe,
        CallbackPipe,
        FileUploader,
    ],
    providers: [
    ],
})
// tslint:disable-next-line:class-name
export class Common_Module {

}
