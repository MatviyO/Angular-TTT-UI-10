import { Component, OnInit, Inject, Injector } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProfilesListConfig } from './list.config';
import {IListWithTriggersConfig} from '../../../../common/interfaces';
import {ApplicationProgram, Profile} from '../../../../core/model';
import {TradesService} from '../../../../core/data';
import {BaseSortableListWithTriggersDirective} from '../../../../common/base-classes';

@Component({
  selector: 'app-profile-list',
  templateUrl: './list.component.html',
  styleUrls: ['list.component.scss'],
  providers: [ProfilesListConfig],
})

export class ProfileListComponent extends BaseSortableListWithTriggersDirective<Profile> implements OnInit {

  // mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  query: any = false;
  phone: any;
  yellowDate: any;
  redDate: any;
  currentDate: Date = new Date();
  trades = this.tradesSvc.getTrades();

  constructor(
    @Inject(ProfilesListConfig) config: IListWithTriggersConfig<Profile>,
    private route: ActivatedRoute,
    private router: Router,
    protected injector: Injector,
    private tradesSvc: TradesService,
  ) {
    super(config);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => this.query = params);

    if (this.query.filter === 'complete') {
      this.filter.complete = true;
      this.showfilter = true;
    }
    if (this.query.filter === 'incomplete') {
      this.filter.complete = false;
      this.filter.pActive = 0;
      this.showfilter = true;
    }
    if (this.query.filter === 'wrn') {
      this.filter.complete = false;
      this.filter.pActive = 2;
      this.showfilter = true;
    }
    if (this.query.filter === 'alert') {
      this.filter.complete = false;
      this.filter.pActive = 3;
      this.showfilter = true;
    }
    super.ngOnInit();
  }


  getData(): void {
    super.getData([
      { key: 'apt', value: 'CanHillerHousingAllowance' },
      { key: 'apt', value: 'HillerEmploymentId' },
    ]);
  }

  getFilterFormatted(): string {
    let filterStr = '';
    if (this.filter.name) {
      const words = this.filter.name.split(' ');
      let fName = '';
      words.forEach((w: string) => {
        if (w !== '') {
          if (fName) { fName += ' and '; }
          fName += `(firstName.contains("${w}") or lastName.contains("${w}"))`;
        }
      });
      filterStr += `(${fName})`;
    }
    if (this.filter.email) {
      if (filterStr) { filterStr += ' and '; }
      filterStr += `email.contains("${this.filter.email}")`;
    }
    if (this.filter.phone) {
      if (filterStr) { filterStr += ' and '; }
      filterStr += `phone.contains("${this.filter.phone}")`;
    }
    if (this.filter.prActive || this.filter.prActive === false) {
      if (filterStr) { filterStr += ' and '; }
      filterStr += `isActive eq ${this.filter.prActive}`;
    }
    if (this.filter.smProfile || this.filter.smProfile === false) {
      if (filterStr) { filterStr += ' and '; }
      if (this.filter.smProfile === false) {
        filterStr += `linkedInProfile=null or facebookProfile=null`;
      } else {
        filterStr += `linkedInProfile != null and facebookProfile != null`;
      }
    }
    if (this.filter.hasPhoto || this.filter.hasPhoto === false) {
      if (filterStr) { filterStr += ' and '; }
      if (this.filter.hasPhoto === false) {
        filterStr += `hasPhoto!=true`;
      } else {
        filterStr += `hasPhoto==true`;
      }
    }
    if (this.filter.complete) {
      if (filterStr) { filterStr += ' and '; }
      filterStr += `registrationCompletionDate != null`;
    }
    if (this.filter.complete === false) {

      if (filterStr) { filterStr += ' and '; }
      filterStr += `registrationCompletionDate = null`;

      if (this.filter.pActive > 0) {
        const yellowDate = new Date();
        yellowDate.setDate(yellowDate.getDate() - 30);

        const yellowDateStr =
          `${yellowDate.getMonth() + 1}/${yellowDate.getDate()}/${yellowDate.getFullYear()}`;

        const redDate = new Date();
        redDate.setDate(redDate.getDate() - 60);

        const redDateStr =
          `${redDate.getMonth() + 1}/${redDate.getDate()}/${redDate.getFullYear()}`;

        if (this.filter.pActive === 1) {
          if (filterStr) { filterStr += ' and '; }
          filterStr += `applicationDate<"${yellowDateStr}"`;
          if (filterStr) { filterStr += ' and '; }
          filterStr += `applicationDate>="${redDateStr}"`;

        }
        if (this.filter.pActive === 2) {
          if (filterStr) { filterStr += ' and '; }
          filterStr += `applicationDate < "${redDateStr}"`;
        }
      }
    }
    if (this.filter.trade) {
      if (filterStr) { filterStr += ' and '; }
      filterStr += `programsAdmittedTo.any(programType == "${this.filter.trade}")`;
    }
    return filterStr;
  }

  getTrades(arr: ApplicationProgram[]): string {
    let str = '';
    if (arr) {

      arr.forEach(el => {
        if (el.programType === 1) {
          str += ' Plumbing,';
        }
        if (el.programType === 2) {
          str += ' Electrical,';
        }
        if (el.programType === 3) {
          str += ' HVAC,';
        }
        if (el.programType === 4) {
          str += ' HVAC Install,';
        }
      });
      str = str.slice(0, str.length - 1);
    }
    return str;
  }
}
