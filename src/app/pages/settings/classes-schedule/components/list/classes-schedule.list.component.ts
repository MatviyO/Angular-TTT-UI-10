import { Component, OnInit, Inject } from '@angular/core';
import { IComponentConfig, IResourceService } from '../../../../../common/interfaces';
import { BaseSortableListDirective, INavigationHelper, NavigationHelper} from '../../../../../common';
import { CampusesService, TradesService, ScheduledClass,
  Campus, Reservation, ApplicationType, Attendee, SchedulingType, MilitaryClassReportService } from '../../../../../core';
import { ClassesScheduleListConfig } from './classes-schedule.list.config';

@Component({
  selector: 'app-classes-schedule-list',
  templateUrl: './classes-schedule.list.component.html',
  styleUrls: ['./classes-schedule.list.component.scss'],
  providers: [ClassesScheduleListConfig, MilitaryClassReportService],
})
export class ClassesScheduleListComponent extends BaseSortableListDirective<ScheduledClass> implements OnInit {
  campuses: Campus[];
  trades = this.tradesSvc.getTrades();

  constructor(
    @Inject(ClassesScheduleListConfig) config: IComponentConfig<ScheduledClass>,
    @Inject(NavigationHelper) protected navigation: INavigationHelper,
    @Inject(CampusesService) private campusesSvc: IResourceService<Campus>,
    private tradesSvc: TradesService,
    private reportSvc: MilitaryClassReportService,
  ) {
    super(config);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.campusesSvc.query()
      .then(res => this.campuses = res)
      .catch((e) => this.onHttpError(e));
  }

  getData(args: any[] = null): void {
    super.getDataInternal('isActive=true', 'startDate desc', this.take, this.skip, args);
  }

  getTrade = (id: number): string => this.tradesSvc.getTradesById(id);

  getCampus(id: number): string {
    const campus = this.campuses.find(x => x.id === id);
    return campus ? campus.name : '';
  }

  getFilterFormatted(): string {
    return '';
  }

  filterMilitary(item: Reservation | Attendee): boolean {
    return item.appUser.type === ApplicationType.Military;
  }

  getSchedulingType(type: SchedulingType): string {
    return SchedulingType[type];
  }

  getClassIconSchedulingType(type: SchedulingType): string {
    if (type === SchedulingType.AM) {
      return 'fa fa-sun-o';
    }
    if (type === SchedulingType.PM1) {
      return 'fa fa-moon-o';
    }
    if (type === SchedulingType.PM2) {
      return 'fa fa-star-o';
    }
  }

  downloadReport(): void {
    this.reportSvc.getReport([], 'Military_Class_Availability').catch(err => this.onHttpError(err));
  }

  getCountActiveAttendees = (attendees: Attendee[]): number => {
    let count = 0;
    if (attendees) {
      attendees.map((attendee: Attendee) => {
        if (!attendee.withdrawnDate) {
          count++;
        }
      });
    }
    return count;
  }
}
