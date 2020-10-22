import { Component, Inject } from '@angular/core';

import { GraduationsListConfig } from './graduations.list.config';
import {Graduation} from '../../../../../core/model/properties';
import {BaseSortableListDirective} from '../../../../../common/base-classes';
import {IDataStorage, IEditorConfig} from '../../../../../common/interfaces';
import {MemoryDataStorage} from '../../../../../common/utils';

@Component({
  selector: 'app-graduations',
  templateUrl: './graduations.list.component.html',
  styleUrls: [],
  providers: [GraduationsListConfig],
})

export class GraduationsListComponent extends BaseSortableListDirective<Graduation> {

    constructor(
        @Inject(GraduationsListConfig) config: IEditorConfig<Graduation>,
        @Inject(MemoryDataStorage) protected storage: IDataStorage,
    ) {
        super(config);
    }

    getFilterFormatted(): string {
        return '';
    }

}
