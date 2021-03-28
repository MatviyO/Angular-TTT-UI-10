import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxUploaderModule } from 'ngx-uploader';
import { AppTranslationModule } from '../app.translation.module';
import { BaThemeConfig } from './theme.config';
import { BaThemeConfigProvider } from './theme.configProvider';
import { BaCardBlur } from './components/baCard/baCardBlur.directive';
import {BaScrollPosition, BaSlimScroll, BaThemeRunDirective} from './directives';
import { BaMenuService, BaThemePreloader, BaThemeSpinner } from './services';
import {
  BaBackTopComponent, BaCardComponent, BaContentTopCommponent, BaMenuItem, BaMenu,
  BaMsgCenter, BaPageTopComponent, BaSidebarComponent
} from './components';
import {Common_Module} from '../common';
import {BaPictureUploaderComponent} from './components/baPictureUploader/baPictureUploader.component';
import {ReminderComponent} from './components/reminder/reminder.component';


const NGA_COMPONENTS = [
  BaBackTopComponent,
  BaCardComponent,
  BaContentTopCommponent,
  BaMenuItem,
  BaMenu,
  BaMsgCenter,
  BaPageTopComponent,
  BaPictureUploaderComponent,
  BaSidebarComponent,
  ReminderComponent
];

const NGA_DIRECTIVES = [
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRunDirective,
  BaCardBlur,
];

const NGA_SERVICES = [
  BaThemePreloader,
  BaThemeSpinner,
  BaMenuService,
];

@NgModule({
  declarations: [
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule,
    NgxUploaderModule,
    Common_Module,
  ],
  exports: [
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS,
  ],
  providers: [
    BaThemeConfigProvider,
    BaThemeConfig,
    ...NGA_SERVICES,
  ]
})

export class NgaModule {
}
