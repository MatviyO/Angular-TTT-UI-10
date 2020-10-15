import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxUploaderModule } from 'ngx-uploader';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
// import { FileDropModule } from 'ngx-file-drop';

import { FormsModule } from '@angular/forms';
import {  InfoBoxComponentComponent, ProgressLoadDataComponent,
        EditorComponent, AddNewItemComponent, SelectCountryStateComponent } from './Components/';
import { ScrollSpyDirective, ContainerDirective, AddNewItemDirective, VisabilitySsnDirective } from './directives';
// import { MemoryCache, MemoryDataStorage } from './utils';
import { CallbackPipe, OrderByPipe } from './pipes';
import { EnumKeyValueListPipe } from './pipes/keyValue.pipe';
import {FileUploaderComponent} from './components/upload-file';
import {ConfirmComponent} from './components/confirm';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NguiAutoCompleteModule,
    NgxUploaderModule,
    // FileDropModule,
  ],

    declarations: [
      ConfirmComponent,
      FileUploaderComponent,
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
    ],
    exports: [
      FileUploaderComponent,
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
      ConfirmComponent
    ],
    providers: [
    ],
})
// tslint:disable-next-line:class-name
export class Common_Module {

}
