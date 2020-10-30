import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ClassActivityConfig} from './class-activity.config';
import {LogItem, LogType, LogTypeSpaceName} from '../../../../core/model/properties/class-activity';
import {ScheduledClass, SchedulingType} from '../../../../core/model';
import {ClassesScheduleService, TradesService} from '../../../../core/data';
import {ConfirmComponent} from '../../../../common/components/confirm';
import {ObservableService} from '../../../../common/services';
import {IEditorConfig, IResourceService} from '../../../../common/interfaces';
import {BaseEditableSortableListDirective} from '../../../../common/base-classes';


@Component({
  selector: 'app-class-activity-list',
  templateUrl: './class-activity-list.component.html',
  styleUrls: ['./class-activity.component.scss', '../../../../common/Components/add-new-item/add-new-item.component.scss'],
  providers: [ClassActivityConfig, ClassesScheduleService, ObservableService],
})

export class ClassActivityListComponent extends BaseEditableSortableListDirective<LogItem> implements OnInit {
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
  classes: ScheduledClass[] = [];
  showNotesArr: number[] = [];
  logType = LogTypeSpaceName;
  itemEdit: LogItem;
  newLogItem: LogItem;
  filterUserId: number = null;
  sourceCompany: any;

  constructor(
    private route: ActivatedRoute,
    private observableSvc: ObservableService,
    private tradesSvc: TradesService,
    @Inject(ClassActivityConfig) config: IEditorConfig<LogItem>,
    @Inject(ClassesScheduleService) private classSvc: IResourceService<ScheduledClass>,

  ) {
    super(config);
  }

  ngOnInit(): void {

    this.classSvc.query('', 'startDate desc', [], 'Days;Program')
      .then(res => this.classes = res)
      .catch((e) => this.onHttpError(e));

    this.route.params
      .subscribe(
        (params: any) => {
          if (params && params.userName && params.userId) {
            this.filter.name = params.userName;
            if (this.navigation.navs.length === 0) {
              this.navigation.addNavigation(params.userName, `/profile/details/${params.userId}`);
            }
            this.showfilter = true;
            this.filterUserId = params.userId;
          }
          if (params && params.classId) {
            this.filter.class = params.classId;
            this.showfilter = true;
          }
        });
    super.ngOnInit();
  }

  newActivity(item: LogItem = null) {
    if (item) {
      if (item.isUserProvided) {
        this.newLogItem = item;
      } else {
        this.itemEdit = item;
      }
    } else {
      this.newLogItem = new LogItem();
    }
  }

  saveNewActivity() {
    this.showLoadData = true;
    const user = Object.assign({}, this.newLogItem.subject);
    const itemEdit = Object.assign({}, this.newLogItem);

    if (+this.newLogItem.itemId > 0) {
      const cl = this.classes.find((x: ScheduledClass) => x.id === +this.newLogItem.itemId);
      if (cl) {
        this.newLogItem.data = {
          Class: {
            StartDate: cl.startDate,
            EndDate: cl.endDate,
            SchedulingType: SchedulingType.AM,
          },
          Program: {
            Name: cl.program.name,
            Trade: this.tradesSvc.getTradesById(cl.program.trade),
          },
        };
      }
    } else {
      this.newLogItem.itemId = null;
      this.newLogItem.data = null;
    }
    this.newLogItem.category = +this.newLogItem.itemId === 0 ? 0 : 1;
    this.newLogItem.subjectId = this.newLogItem.subject ? this.newLogItem.subject.id : null;
    this.newLogItem.subject = null;

    if (this.newLogItem.id) {
      const index = this.entities.findIndex((x: LogItem) => x.id === this.newLogItem.id);

      this.dataSvc.update(this.newLogItem)
        .then((res: LogItem) => {
          res.subject = itemEdit.subject;
          this.entities[index] = res;
          this.newLogItem = null;
          this.showLoadData = false;
        })
        .catch(err => this.onHttpError(err));
    } else {
      this.dataSvc.create(this.newLogItem)
        .then((res) => {
          res.subject = user;
          this.entities.unshift(res);
          this.newLogItem = null;
          this.showLoadData = false;
        })
        .catch(err => this.onHttpError(err));
    }
  }

  isValid() {
    return !((this.newLogItem.subject && this.newLogItem.subject.id) || this.newLogItem.itemId > 0 || this.newLogItem.userData);
  }

  observableSource(keyword: any): any {
    return this.observableSvc.observableSourceProfile.bind(keyword);
  }

  saveNote() {
    const index = this.entities.findIndex((x: LogItem) => x.id === this.itemEdit.id);
    const itemEdit = Object.assign({}, this.itemEdit);
    this.save(this.itemEdit)
      .then((res: LogItem) => {
        itemEdit.rowVersion = res.rowVersion;
        this.entities[index] = itemEdit;
        this.itemEdit = null;
      });
  }

  onDelete(item: LogItem) {
    this.confirm.show('confirm', `Are you sure you\'d like to delete this item?`)
      .then(result => { if (result) { this.delete(item); } });
  }

  getLogStatus(type: LogType): string {
    switch (type) {
      case LogType.classReservationAdded: return 'Added';
      case LogType.classReservationRemoved: return 'Removed reservation';
      case LogType.classReservationPromoted: return 'Promoted';
      case LogType.classParticipantMovedFromClass: return 'Moved from class';
      case LogType.classParticipantMovedToClass: return 'Moved to class';
      case LogType.classAttendeeWithdrawn: return 'Withdrawn';
      case LogType.classAttendeeRemoved: return 'Removed attendee';
      default: return '';
    }
  }

  getSchedulingTypeLog(item: LogItem): boolean {
    if (item.type === LogType.classParticipantMovedToClass) {
      return item.data.To.Class.SchedulingType;
    }
    if (item.type === LogType.classParticipantMovedFromClass) {
      return item.data.From.Class.SchedulingType;
    }
    if (item.data && item.data.Class) {
      return item.data.Class.SchedulingType;
    }
    return false;
  }

  getClassName(item: LogItem): Object {
    let name = null, dateStart = null, dateEnd = null, trade = null;

    if (item.type === LogType.classParticipantMovedToClass) {
      name = item.data.To.Program.Name;
      trade = item.data.To.Program.Trade;
      dateStart = item.data.To.Class.StartDate;
      dateEnd = item.data.To.Class.EndDate;
    } else {
      if (item.type === LogType.classParticipantMovedFromClass) {
        name = item.data.From.Program.Name;
        trade = item.data.From.Program.Trade;
        dateStart = item.data.From.Class.StartDate;
        dateEnd = item.data.From.Class.EndDate;
      } else {
        if (item.data && item.data.Program && item.data.Class) {
          name = item.data.Program.Name;
          trade = item.data.Program.Trade;
          dateStart = item.data.Class.StartDate;
          dateEnd = item.data.Class.EndDate;
        }
      }
    }
    return { name, trade, dateStart, dateEnd };
  }

  showMoreNote(id: number): void {
    this.showNotesArr.push(id);
  }

  hideNote(id: number): void {
    const index = this.showNotesArr.findIndex((x: number) => x === id);
    this.showNotesArr.splice(index);
  }

  isFullNote(id: number): boolean {
    const index = this.showNotesArr.findIndex((x: number) => x === id);
    return index >= 0;
  }

  getNotes(item: LogItem): Object {
    let note = item.userData;
    const showMore = note && note.length > 107;
    if (showMore) {
      note = note.substring(0, 100);
    }
    return { note, showMore };
  }

  getFilterFormatted(): string {
    let filterStr = '';
    if (this.filter.name) {
      const words = this.filter.name.split(' ');
      let fName = '';

      if (this.filterUserId) {
        filterStr += `subjectId=="${this.filterUserId}"`;
        this.filterUserId = null;
      } else {
        words.forEach((w: string) => {
          if (w) {
            if (fName) { fName += ' and '; }
            fName += `(subject.firstName.contains("${w}") or subject.lastName.contains("${w}"))`;
          }
        });
        filterStr += `(${fName})`;
      }
    }

    if (this.filter.class && this.filter.class !== 'undefined') {
      if (filterStr) { filterStr += ' and '; }
      filterStr += `itemId==("${this.filter.class}")`;
    }

    if (this.filter.status && this.filter.status !== 'undefined') {
      if (filterStr) { filterStr += ' and '; }
      if (this.filter.status === '-1') {
        filterStr += `type<"1000"`;
      } else {
        filterStr += `type=="${this.filter.status}"`;
      }
    }

    if (this.filter.fromDate) {
      if (filterStr) { filterStr += ' and '; }
      filterStr += `created >="${this.filter.fromDate}"`;
    }

    if (this.filter.toDate) {
      const date = this.formatedDate(new Date(new Date(this.filter.toDate).setDate(new Date(this.filter.toDate).getDate() + 1)));
      if (filterStr) { filterStr += ' and '; }
      filterStr += `created <="${date}"`;
    }

    return filterStr;
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

  formatedDate(inDate: Date): string | Date {
    if (inDate) {
      inDate = new Date(inDate);
      return `${inDate.getMonth() + 1}/${inDate.getDate()}/${inDate.getFullYear()}`;
    } else {
      return new Date();
    }
  }

}
