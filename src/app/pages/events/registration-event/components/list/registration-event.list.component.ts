import { Component, Inject, OnInit } from '@angular/core';
import { IEditorConfig, IDataStorage, IResourceService } from '@ttt/common/interfaces';
import { BaseSortableList, MemoryDataStorage } from '@ttt/common';
import { MilitaryBase, RegistrationEvent } from '@ttt/core/model';
import { RegistrationEventListConfig } from './registration-event.list.config';
import { MilitaryBaseService } from 'app/core/data';

@Component({
    selector: 'app-registration-event',
    templateUrl: './registration-event.list.component.html',
    styleUrls: ['./../../../events.component.scss'],
    providers: [RegistrationEventListConfig, MilitaryBaseService],
})

export class RegistrationEventListComponent extends BaseSortableList<RegistrationEvent> implements OnInit {

    private militaryBases: MilitaryBase[] = [];

    constructor(
        @Inject(RegistrationEventListConfig) config: IEditorConfig<RegistrationEvent>,
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
            filterStr += `date = "${this.filter.date}"`;
        }

        if (this.filter.baseId) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `baseId = "${this.filter.baseId}"`;
        }
       
        if (this.filter.status) {
            if (filterStr) { filterStr += ' and '; }
            
            if (this.filter.status === 'active') {
                filterStr += `date = "${this.formatDate(new Date())}"`;
            }
            if (this.filter.status === 'planned') {
                filterStr += `date > "${this.formatDate(new Date())}"`;
                
            }
            if (this.filter.status === 'completed') {
                filterStr += `date < "${this.formatDate(new Date())}"`;
            }
        }
        
        if (this.filter.allowed) {
            if (filterStr) { filterStr += ' and '; }
            this.filter.allowed === 1
                    ?
                    filterStr += `registrationAllowed = true`
                    :
                    filterStr += `registrationAllowed = false`;
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
