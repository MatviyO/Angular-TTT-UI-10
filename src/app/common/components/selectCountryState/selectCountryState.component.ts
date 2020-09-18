import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {CountryStatesService, State} from '../../../core/data/country-state.service';


@Component({
    selector: 'app-select-country-state',
    styleUrls: ['selectCountryState.scss'],
    template: `

    <div class="form-group select-st">
      <label>Country</label>
      <select class="form-control" name="addreess-country" [(ngModel)]="country" required
        (change)="changeCompany()">
        <option hidden [ngValue]="undefined">select...</option>
        <option [ngValue]="null">select...</option>
        <option *ngFor="let country of countries" [ngValue]="country.countryShortCode">
          {{country.countryName}}</option>
      </select>
    </div>

    <div class="form-group select-st no-padd">
      <label for="addreess-state">State</label>
      <select class="form-control" name="addreess-state" [(ngModel)]="state" (change)="changedValue()">
        <option hidden [ngValue]="undefined">select...</option>
        <option [ngValue]="null">select...</option>
        <option *ngFor="let state of states" [ngValue]="state.shortCode">{{state.name}}
        </option>
      </select>
    </div>

    `,
})


export class SelectCountryStateComponent implements OnInit {
    countries = this.countrySvc.getCounries();
    states: State[] = [];

    constructor(private countrySvc: CountryStatesService) { }

    @Output() onChangeCompany = new EventEmitter();
    @Input() country: string;
    @Input() state: string;

    ngOnInit(): void {
        this.changeCompany(true);
    }

    changeCompany(firstLoad: boolean = false): void {
        if (this.country) {
          // tslint:disable-next-line:variable-name
            const _country = this.countries.find(x => x.countryShortCode === this.country);
            if (_country) {
                this.states = _country.regions;
            }
            if (!firstLoad) { this.state = null; }
        } else {
            this.state = null;
            this.states = [];
        }
        this.changedValue();
    }

    changedValue(): void {
        this.onChangeCompany.emit({ country: this.country, state: this.state });
    }

}
