import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { AlternativeLocationConfig } from './alternativeLocations.config';
import {ConfirmComponent} from '../../../../../../../common/components/confirm';
import {AlternativeLocation} from '../../../../../../../core/model/properties';
import {IEditorConfig} from '../../../../../../../common/interfaces';
import {CountryStatesService, State} from '../../../../../../../core/data/country-state.service';
import {BaseEditableListDirective} from '../../../../../../../common/base-classes';


@Component({
    selector: 'app-alternative-locations',
    templateUrl: './alternativeLocations.component.html',
    styleUrls: ['./alternativeLocations.component.scss'],
    providers: [AlternativeLocationConfig],
})

export class AlternativeLocationsComponent extends BaseEditableListDirective<AlternativeLocation> implements OnInit {
    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
    companyId: number;
    countries = this.countrySvc.getCounries();
    states: State[] = [];

    constructor(
        @Inject(AlternativeLocationConfig) config: IEditorConfig<AlternativeLocation>,
        private countrySvc: CountryStatesService,
    ) {
        super(config);
    }

    ngOnInit(): void { }

    getData(args: any[] = null): void {
        if (this.companyId > 0) {
            super.getDataInternal(`companyId==${this.companyId}`, 'id desc', this.take, this.skip, []);
        } else {
            this.getDataInternal('', '', this.take, this.skip, args);
        }
    }

    load(companyId: number, locations: AlternativeLocation[]): void {
        if (companyId > 0) {
            this.companyId = companyId;
            this.entities = locations;
        }
    }

    changeCompany(index: number = null, firstLoad: boolean = false): any {
        if (index !== null) {
          // tslint:disable-next-line:variable-name
            const _country = this.countries.find(x => x.countryShortCode === this.entities[index].country);
            if (_country) { this.states = _country.regions; }
            if (!firstLoad) { this.entities[index].state = null; }
        } else {

            if (this.entity.country) {
              // tslint:disable-next-line:variable-name
                const _country = this.countries.find(x => x.countryShortCode === this.entity.country);
                if (_country) { this.states = _country.regions; }
                if (!firstLoad) { this.entity.state = null; }
            } else {
                this.entity.state = null;
                this.states = [];
            }
        }
    }

    validationMaxlength = (item: AlternativeLocation): number => item.country === 'US' ? 5 : 10;
    validationMinlength = (item: AlternativeLocation): number => item.country === 'US' ? 5 : 1;

    onSave(item, form): void {
        item.companyId = this.companyId;
        super.onSave(item, form);
    }

    onDelete(item: AlternativeLocation): void {
        const status = !item.isActive ? 'enable' : 'disable';
        this.confirm.show('confirm', `Are you sure you\'d like to ${status} this item?`)
            .then(result => {
                if (result) {
                    super.delete(item);
                }
            });
    }

}
