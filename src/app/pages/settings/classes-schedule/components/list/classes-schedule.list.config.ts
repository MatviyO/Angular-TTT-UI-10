import { Injectable, Inject, Injector } from '@angular/core';
import { IComponentConfig, IDataService } from '../../../../../common/interfaces';
import { ScheduledClass, ClassesService } from '../../../../../core';

@Injectable()
export class ClassesScheduleListConfig implements IComponentConfig<ScheduledClass> {
  componentTitle = 'Classes';
  includes = 'Campus,Program;Participants.AppUser;Days;LaterClass;PriorClass';

  // tslint:disable-next-line:max-line-length
  selectJSONPath = 'id;isActive;totalSpotsLeft;militarySpotsLeft;priorClassId;laterClassId;schedulingType;startDate;endDate;campus.name;program.trade;program.name;reservations[*].appUser.type;attendees[*].id;attendees[*].appUser.type;attendees[*].withdrawnDate';

  constructor(
    @Inject(ClassesService) public dataSvc: IDataService<ScheduledClass>,
    public injector: Injector,
  ) { }
}
