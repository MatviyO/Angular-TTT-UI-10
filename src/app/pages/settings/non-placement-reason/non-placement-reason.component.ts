import { Component, ViewChild, Inject } from '@angular/core';

import { NonPlacementReasonConfig } from './non-placement-reason.config';
import {BaseEditableList} from '../../../common/base-classes';
import {ConfirmComponent} from '../../../common/components/confirm';
import {IEditorConfig} from '../../../common/interfaces';
import {NonPlacementReason} from '../../../core/model/properties';


@Component({
    selector: 'app-non-placement-reason',
    templateUrl: './non-placement-reason.html',
    styleUrls: ['./non-placement-reason.scss'],
    providers: [NonPlacementReasonConfig],

})
export class NonPlacementReasonComponent extends BaseEditableList<NonPlacementReason> {
    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

    constructor(
        @Inject(NonPlacementReasonConfig) config: IEditorConfig<NonPlacementReason>,
    ) {
        super(config);
    }

    clickSchooling(): any {
        this.entity.type = this.entity.type ? 1 : 0;
    }

    onDelete(item: NonPlacementReason): void {
        const status = !item.isActive ? 'enable' : 'disable';
        this.confirm.show('confirm', `Are you sure you\'d like to ${status} this item?`)
            .then(result => {
                if (result) {
                    if (item.isActive) {
                        item.isActive = false;
                    } else {
                        item.isActive = true;
                    }
                    super.save(item);
                    // super.delete(item);
                }
            });

    }

}
