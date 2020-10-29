import { Component, ViewChild, Inject } from '@angular/core';

import { RankConfig } from './rank.config';
import {ConfirmComponent} from '../../../common/components/confirm';
import {Rank} from '../../../core/model/properties';
import {IEditorConfig} from '../../../common/interfaces';
import {BaseEditableListDirective} from '../../../common/base-classes';


@Component({
    selector: 'app-rank',
    templateUrl: './rank.component.html',
    styleUrls: ['./rank.component.scss'],
    providers: [RankConfig],
})

export class RankComponent extends BaseEditableListDirective<Rank> {
    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

    constructor(
        @Inject(RankConfig) config: IEditorConfig<Rank>,
    ) {
        super(config);
    }

    // _____________________________________inactive only
    onDelete(item: Rank): void {
        const status = !item.isActive ? 'enable' : 'disable';
        this.confirm.show('confirm', `Are you sure you\'d like to ${status} this item?`)
            .then(result => {
                if (result) {
                    item.isActive = !item.isActive;
                    super.save(item);
                }
            });
    }

}
