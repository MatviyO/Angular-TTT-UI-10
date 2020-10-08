import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CompanyComponent} from './company.component';
import { CompanyListComponent } from './components/list/company-list.component';
import {CompanyRoutingModule} from './company-routing.module';
import {NgaModule} from '../../../theme/nga.module';
import {FormsModule} from '@angular/forms';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';

@NgModule({
  declarations: [CompanyComponent, CompanyListComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    NgaModule,
    FormsModule,
    NguiAutoCompleteModule,
  ],
  providers: []
})
export class CompanyModule { }
