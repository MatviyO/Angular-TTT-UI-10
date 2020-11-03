import { Component, Inject, OnInit } from '@angular/core';

import { OrientationEventListConfig } from './orientation-event.list.config';
import {IDataStorage, IEditorConfig, IResourceService} from '../../../../../common/interfaces';
import {MilitaryBase} from '../../../../../core/model/properties';
import { BaseSortableListDirective} from '../../../../../common/base-classes';
import {MemoryDataStorage} from '../../../../../common/utils';
import {OrientationEvent} from '../../../../../core/model';
import {MilitaryBaseService} from '../../../../../core/data';

@Component({
  selector: 'app-orientation-event',
  templateUrl: './orientation-event.list.component.html',
  styleUrls: ['./../../../events.component.scss'],
  providers: [OrientationEventListConfig, MilitaryBaseService],
})

export class OrientationEventListComponent extends BaseSortableListDirective<OrientationEvent> implements OnInit {

  private militaryBases: MilitaryBase[] = [];

  constructor(
    @Inject(OrientationEventListConfig) config: IEditorConfig<OrientationEvent>,
    @Inject(MemoryDataStorage) protected storage: IDataStorage,
    @Inject(MilitaryBaseService) protected militarySvc: IResourceService<MilitaryBase>,
  ) {
    super(config);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.militarySvc.query('', '', null, 'null', 'id;name;isActive')
      .then((res: MilitaryBase[]) => this.militaryBases = res)
      .catch(err => this.onHttpError(err));

  }

  getFilterFormatted(): string {
    let filterStr = '';
    if (this.filter.date) {
      if (filterStr) { filterStr += ' and '; }
      filterStr += `date > "${this.moment(this.filter.date).subtract(1, 'day').format('L')}" and date < "${this.moment(this.filter.date).add(1, 'day').format('L')}"`;
    }

    if (this.filter.baseId) {
      if (filterStr) { filterStr += ' and '; }
      filterStr += `baseId = "${this.filter.baseId}"`;
    }

    if (this.filter.status) {
      if (filterStr) { filterStr += ' and '; }

      if (this.filter.status === 'active') {
        filterStr += `date > "${this.moment().subtract(1, 'day').format('L')}" and date < "${this.moment().add(1, 'day').format('L')}"`;
      }
      if (this.filter.status === 'planned') {
        filterStr += `date > "${this.formatDate(new Date())}"`;

      }
      if (this.filter.status === 'completed') {
        filterStr += `date < "${this.formatDate(new Date())}"`;
      }
    }


    return filterStr;
  }

  getMilitaryBaseById = (id: number): string => {
    let name = '';
    const military = this.militaryBases.find((x: MilitaryBase) => x.id === id);
    if (military) {
      name = military.name;
    }
    return name;
  }

  formatDate(d: Date): string {
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }

}
