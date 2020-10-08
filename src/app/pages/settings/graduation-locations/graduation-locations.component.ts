import { Component, ViewChild, Inject } from '@angular/core';
import { GraduationLocationConfig } from './graduation-locations.config';
import {GraduationLocation} from '../../../core/model/properties';
import {ConfirmComponent} from '../../../common/components/confirm';
import {BaseEditableList} from '../../../common/base-classes';

import {IEditorConfig} from '../../../common/interfaces';
import {CountryStatesService, State} from '../../../core/data/country-state.service';


@Component({
    selector: 'app-graduation-locations',
    templateUrl: './graduation-locations.component.html',
    styleUrls: ['./graduation-locations.component.scss'],
    providers: [GraduationLocationConfig],
})

export class GraduationLocationsComponent extends BaseEditableList<GraduationLocation> {
    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

    countries = this.countrySvc.getCounries();
    states: State[] = [];

    constructor(
        @Inject(GraduationLocationConfig) config: IEditorConfig<GraduationLocation>,
        private countrySvc: CountryStatesService,
    ) {
        super(config);
    }

    validationMaxlength = (item: GraduationLocation): number => item.country === 'US' ? 5 : 10;
    validationMinlength = (item: GraduationLocation): number => item.country === 'US' ? 5 : 1;

    changeCompany(index: number = null, firstLoad: boolean = false): any {
        if (index !== null) {
            const variableCountry = this.countries.find(x => x.countryShortCode === this.entities[index].country);
            if (variableCountry) { this.states = variableCountry.regions; }
            if (!firstLoad) { this.entities[index].state = null; }
        } else {

            if (this.entity.country) {
                const variableCountry = this.countries.find(x => x.countryShortCode === this.entity.country);
                if (variableCountry) { this.states = variableCountry.regions; }
                if (!firstLoad) { this.entity.state = null; }
            } else {
                this.entity.state = null;
                this.states = [];
            }
        }
    }

    onDelete(item: GraduationLocation): void {
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
                }
            });
    }

}
