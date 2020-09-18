import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {NgxUploaderModule } from 'ngx-uploader';
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
        // Ng2AutoCompleteModule,
        NgxUploaderModule,
        // FileDropModule,
    ],

    declarations: [
        // ConfirmComponent,
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
        // ConfirmComponent,
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
