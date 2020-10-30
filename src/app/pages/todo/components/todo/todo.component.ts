import { Component, OnInit, Injector } from '@angular/core';
import { Observable } from '../../../../../../node_modules/rxjs';
import {TriggerHelper, TriggerService} from '../../../../core/data';
import {IBaseConfig} from '../../../../common/interfaces';
import {NotificationService} from '../../../../common/services';
import {ComponentBaseDirective} from '../../../../common/base-classes/componentBase';
import {Trigger} from '../../../../core/model';


@Component({
    selector: 'app-triger',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss'],
})

export class TodoComponent extends ComponentBaseDirective implements OnInit {
    showLoadData = true;
    triggers: any;
    filter: any = { category: 'All' };
    filterStr: string;
    showfilter = false;

    constructor(
        private dataTrg: TriggerService,
        private triggerHelper: TriggerHelper,
        protected injector: Injector,
        protected notificationSvc: NotificationService,
    ) {
        super({ componentTitle: 'ToDo', injector } as IBaseConfig);
        this.notificationSvc = injector.get(NotificationService);
    }

    ngOnInit(): void {
        this.getData();
    }

    getLinkToDetails(trigger: any): string {
        let url = '/';

        url += `${this.getTriggerCat(trigger.triggerCategory).url}`;
        if (+trigger.triggerCategory === 5) {
            url += `${trigger.applicationId}/${trigger.data.firstName} ${trigger.data.lastName}/${trigger.mainObjectId}`;
        } else {
            if (+trigger.triggerCategory === 8) {
                url += `${trigger.applicationId}/${trigger.data.firstName} ${trigger.data.lastName}/${trigger.mainObjectId}/null`;
            } else {
                url += trigger.mainObjectId;
            }
        }
        return url;
    }

    getData(): any {
        let p: Observable<Trigger[]>;
        if (this.filter.type && this.filter.type !== 'undefined') {
            p = this.dataTrg.queryByType(this.filter.type, this.filterStr);
        } else {
            if (this.filter.category) {
                p = this.dataTrg.queryByCategory(this.filter.category, this.filterStr);
            } else {
                p = this.dataTrg.queryByCategory(null, this.filterStr);
            }
        }

        p.subscribe(
            res => {
                const triggersGroup: { triggers: Trigger[], applicationId: number, name: string }[] = [];
                res.forEach(item => {
                    let a = triggersGroup.find(x => x.applicationId === item.applicationId);
                    let found = true;
                    if (!a) {
                        found = false;
                        a = {
                            applicationId: item.applicationId,
                            name: `${item.data.firstName} ${item.data.lastName}`,
                            triggers: [],
                        };
                    }
                    a.triggers.push(item);
                    if (!found) {
                        triggersGroup.push(a);
                    }
                });

                this.triggers = triggersGroup;
                this.showLoadData = false;
            },
            err => {
                this.onHttpError(err);
                this.showLoadData = false;
            },
        );
    }

    search(): void {
        this.filterStr = '';
        if (this.filter.status > 0) {
            if (this.filterStr) { this.filterStr += ' and '; }
            this.filterStr += `severity="${this.filter.status}"`;
        }
        this.getData();
    }

    getTriggerCat = (catId: number): any => this.triggerHelper.getTriggerCat(catId);

    getTriggerType = (typeId: number): string => this.triggerHelper.getTriggerType(typeId);

    getDays = (days: number, approaching: boolean): string => this.triggerHelper.getDays(days, approaching);
}

