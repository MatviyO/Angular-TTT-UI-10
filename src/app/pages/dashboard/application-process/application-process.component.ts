import { Component, OnInit, Injector } from '@angular/core';
import { sortBy } from 'lodash';
import {EmploymentCompanyResourceService, ProfileResourceService, StatesService, StudentStatsService} from '../../../core/data';
import {IBaseConfig} from '../../../common/interfaces';
import {ComponentBaseDirective} from '../../../common/base-classes/componentBase';

@Component({
  selector: 'app-application-process',
  templateUrl: './application-process.component.html',
  styleUrls: ['./application-process.component.scss'],
  providers: [EmploymentCompanyResourceService, StatesService, StudentStatsService],
})

export class ApplicationProcessComponent extends ComponentBaseDirective implements OnInit {

  presentYear = new Date().getFullYear();
  lastYear = new Date().getFullYear() - 1;

  queries: string[] = [
    `registrationCompletionDate != null`,
    `registrationCompletionDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and registrationCompletionDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}" `,
    `registrationCompletionDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    `registrationCompletionDate == null`,
    `registrationCompletionDate == null and applicationDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and applicationDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `registrationCompletionDate == null and applicationDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    `programsAdmittedTo.any(programType == "1")`,
    `programsAdmittedTo.any(programType == "1") and applicationDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and applicationDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `programsAdmittedTo.any(programType == "1") and applicationDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    `programsAdmittedTo.any(programType == "2")`,
    `programsAdmittedTo.any(programType == "2") and applicationDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and applicationDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `programsAdmittedTo.any(programType == "2") and applicationDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
    `programsAdmittedTo.any(programType == "3")`,
    `programsAdmittedTo.any(programType == "3") and applicationDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and applicationDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `programsAdmittedTo.any(programType == "3") and applicationDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,

    `programsAdmittedTo.any(programType == "4")`,
    `programsAdmittedTo.any(programType == "4") and applicationDate > "${this.formatDate(new Date(this.lastYear, 0, 1))}" and applicationDate < "${this.formatDate(new Date(this.lastYear, 11, 31))}"`,
    `programsAdmittedTo.any(programType == "4") and applicationDate > "${this.formatDate(new Date(this.presentYear, 0, 1))}"`,
  ];

  resData = {
    complete: 0,
    completeLast: 0,
    completePresent: 0,
    incomplete: 0,
    incompleteLast: 0,
    incompletePresent: 0,
    plumbing: 0,
    plumbingLast: 0,
    plumbingPresent: 0,
    electrical: 0,
    electricalLast: 0,
    electricalPresent: 0,
    hvac: 0,
    hvacLast: 0,
    hvacPresent: 0,

    hvacInstall: 0,
    hvacInstallLast: 0,
    hvacInstallPresent: 0,
  };

  militaryStats = new Array();
  states = this.statesSvc.getStates();
  showZero = false;
  allEpmploymentsInStates = [];
  epmploymentsInStates = [];
  epmploymentsInStatesTotal = 0;

  studentStats: any = {};

  constructor(
    private profileSvc: ProfileResourceService,
    private employmentCompSvc: EmploymentCompanyResourceService,
    protected injector: Injector,
    private statesSvc: StatesService,
    private studentStatsSvc: StudentStatsService,

  ) {
    super({ componentTitle: 'App. process', injector } as IBaseConfig);
  }

  objectKeys(obj): any {
    if (obj) {
      return Object.keys(obj);
    }
    return [];
  }

  ngOnInit(): void {
    this.showLoadData = true;

    this.studentStatsSvc.query()
      .then((res: any) => {
        this.studentStats = res;
        if (res.rank) {
          this.studentStats.rank.keys = Object.keys(res.rank);
          this.studentStats.rank.keys = sortBy(this.studentStats.rank.keys);
        }
      });
    this.employmentCompSvc.query('Cast("EmploymentRecord").CompanyTrade.company.country = "US" and StartDate != null ', '', null, 'CompanyTrade.Company;Stages.Status')
      .then(res => {
        this.epmploymentsInStatesTotal = res.length;
        this.states.map(state => {
          const a = res.filter((x: any) => x.companyTrade.company.state === state.abbreviation);
          this.allEpmploymentsInStates.push({ state: state.name, count: a.length });
        });
        this.epmploymentsInStates = this.allEpmploymentsInStates.filter(x => x.count > 0);
      });
    this.getResPromises(this.queries, this.resData);
  }

  showZeroEmploymentsCoutn = () => {
    this.showZero = !this.showZero;
    this.epmploymentsInStates = this.showZero ? this.allEpmploymentsInStates : this.allEpmploymentsInStates.filter(x => x.count > 0);
  }

  getResPromises(arrQueries: string[], values: any): void {
    const promiseArray = [];
    arrQueries.forEach(item => promiseArray.push(this.profileSvc.count(`(${item}) and isActive==true`)));
    Promise.all(promiseArray)
      .then((res) => {
        let i = 0;
        for (const key in values) {
          if (key) {
            this.resData[key] = res[i];
            i++;
          }
        }
        this.showLoadData = false;
      })

      .catch(err => this.onHttpError(err));
  }

  formatDate(d: Date): string {
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }

}
