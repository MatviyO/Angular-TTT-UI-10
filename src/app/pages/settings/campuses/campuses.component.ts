import {Component, Inject, ViewChild} from '@angular/core';
import {CampusConfig} from './campuses.config';
import {ConfirmComponent} from '../../../common/components/confirm';
import {BaseEditableListDirective} from '../../../common/base-classes';
import {Campus} from '../../../core/model/properties';
import {IEditorConfig} from '../../../common/interfaces';
import {CountryStatesService, State} from '../../../core/data/country-state.service';

@Component({
  selector: 'app-campuses',
  templateUrl: './campuses.component.html',
  styleUrls: ['./campuses.component.scss'],
  providers: [CampusConfig]
})
export class CampusesComponent extends BaseEditableListDirective<Campus>  {
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

  countries = this.countrySvc.getCounries();
  states: State[] = [];

  constructor(
    @Inject(CampusConfig) config: IEditorConfig<Campus>,
    private countrySvc: CountryStatesService,
  ) {
    super(config);
  }

  validationMaxlength = (item: Campus): number => item.country === 'US' ? 5 : 10;
  validationMinlength = (item: Campus): number => item.country === 'US' ? 5 : 1;

  changeCompany(index: number = null, firstLoad: boolean = false): any {
    if (index !== null) {
      const _country = this.countries.find(x => x.countryShortCode === this.entities[index].country);
      if (_country) { this.states = _country.regions; }
      if (!firstLoad) { this.entities[index].state = null; }
    } else {

      if (this.entity.country) {
        const _country = this.countries.find(x => x.countryShortCode === this.entity.country);
        if (_country) { this.states = _country.regions; }
        if (!firstLoad) { this.entity.state = null; }
      } else {
        this.entity.state = null;
        this.states = [];
      }
    }
  }

  onDelete(item: Campus): void {
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
