import { Injectable, Inject, Injector } from '@angular/core';

import { RankService } from './rank.service';
import {Rank} from '../../../core/model/properties';
import {IDataService, IEditorConfig} from '../../../common/interfaces';


@Injectable()
export class RankConfig implements IEditorConfig<Rank> {
    cls: new () => any = Rank;
    componentTitle = 'Rank';
    includes = 'null';

    constructor(
        @Inject(RankService) public dataSvc: IDataService<Rank>,
        public injector: Injector,
    ) { }
}
