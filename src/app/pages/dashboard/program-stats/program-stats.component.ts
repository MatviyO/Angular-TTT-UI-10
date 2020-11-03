import { Component, OnInit, Injector } from '@angular/core';
import { IBaseConfig } from '../../../common';
import {ComponentBaseDirective} from '../../../common/base-classes/componentBase';
import {ClassesScheduleService, ProfileResourceService, ProgramStatsService, StudentGraduationsResourseService} from '../../../core/data';
import {ScheduledClass} from '../../../core/model';


@Component({
  selector: 'app-program-stats',
  templateUrl: './program-stats.component.html',
  styleUrls: ['./program-stats.component.scss'],
  providers: [ProgramStatsService],
})

export class ProgramStatsComponent extends ComponentBaseDirective implements OnInit {

  allActiveClasses: number = 0;
  hvacActiveClass: number = 0;
  plumbingActiveClass: number = 0;
  electricalActiveClass: number = 0;
  hvacInstallActiveClass: number = 0;

  gradArray: any = [];
  exitsGraduation: number = 0;
  apllComplete: number;

  h: boolean = true;
  p: boolean = false;
  t: boolean = false;
  date: Date = new Date();


  programStats: any = {
    total: {},
    plumbing: {},
    hvac: {},
    electrical: {},
    hvacInstall: {},
  };

  queries: string[] = [
  ];

  resData: any = {
    waitingFirstClass: 0,
    hasGraduations: 0,
  };

  statsProgram: any;

  constructor(
    protected programStatsSvc: ProgramStatsService,
    private profileSvc: ProfileResourceService,
    private graduationsSvc: StudentGraduationsResourseService,
    private classesSvc: ClassesScheduleService,
    protected injector: Injector,
  ) {
    super({ componentTitle: 'App. process', injector } as IBaseConfig);
  }

  ngOnInit(): void {
    this.showLoadData = true;

    const promises = [];

    promises.push(this.programStatsSvc.query()
      .then((res: any) => {
        this.statsProgram = res;
        this.resData.hasGraduations = res.totalGraduates;
      })
      .catch(err => this.onHttpError(err)));

    promises.push(this.profileSvc.count('registrationCompletionDate==null and isActive==true')
      .then(res => this.apllComplete = res)
      .catch(err => this.onHttpError(err)));

    promises.push(this.profileSvc.count(`Classes.Any(withdrawnDate == null) and Classes.Any(Class.Days.All(Date > "${this.formatDate(this.date)}"))  and isActive==true`)
      .then(res => {
        this.resData.waitingFirstClass = res;
      })
      .catch(err => this.onHttpError(err)));

    // todo: all classes ended
    // promises.push(this.profileSvc.count(`Classes.Any(withdrawnDate == null) and Graduation.GraduationExpectedDate.Date < "${this.formatDate(this.date)}"  and isActive==true`)
    //     .then(res => {
    //         this.resData.hasGraduations = res;
    //     })
    //     .catch(err => this.onHttpError(err)));

    promises.push(this.classesSvc.query(
      `days.any(date<="${this.formatDate(this.date)}") and days.any(date>="${this.formatDate(this.date)}") and (attendees.any(appUser.type=="3"))`,
      '', [], 'Days, Participants.AppUser, Program', '',
    )/*  or reservations.any(appUser.type=="3") */
      .then((res: ScheduledClass[]) => {
        this.allActiveClasses = res.length;

        res.forEach((cls: ScheduledClass) => {
          if (this.date < new Date(cls.endDate)) {
            cls.attendees.forEach(x => {
              if (x.appUser.type === 3 && x.withdrawnDate && new Date(x.withdrawnDate as Date) <= new Date(cls.endDate)) {
                this.exitsGraduation++;
              }
            });

            if (cls.program.trade === 4) {
              this.hvacInstallActiveClass++;
            }
            if (cls.program.trade === 3) {
              this.hvacActiveClass++;
            }
            if (cls.program.trade === 2) {
              this.electricalActiveClass++;
            }
            if (cls.program.trade === 1) {
              this.plumbingActiveClass++;
            }
          }
        });

      })
      .catch(err => this.onHttpError(err)));

    promises.push(this.graduationsSvc.query(`graduationExpectedDate.date>"${this.formatDate(this.date)}"`)
      .then(res => {
        res.forEach(el => {
          const a = this.gradArray.find(x => x.id === el.graduationExpectedDate.id);
          if (!a) {
            const obj = {
              id: el.graduationExpectedDate.id,
              date: el.graduationExpectedDate.date,
              count: 1,
            };
            this.gradArray.push(obj);
          } else {
            a.count += 1;
          }
        });
      })
      .catch(err => this.onHttpError(err)));

    Promise.all(promises)
      .then(() => this.showLoadData = false)
      .catch(() => this.showLoadData = false);
  }

  formatDate(d: Date): string {
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }
}

