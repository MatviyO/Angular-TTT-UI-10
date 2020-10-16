import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {BaseEditableListDirective} from '../../../common/base-classes';
import {OfficeLocation} from '../../../core/model/properties';
import {OfficeLocationsConfig} from './office-locations.config';
import {IEditorConfig} from '../../../common/interfaces';
import {CountryStatesService, State} from '../../../core/data/country-state.service';
import {ConfirmComponent} from '../../../common/components/confirm';

@Component({
  selector: 'app-office-locations',
  templateUrl: './office-locations.component.html',
  styleUrls: ['./office-locations.component.scss']
})
export class OfficeLocationsComponent extends BaseEditableListDirective<OfficeLocation> implements OnInit {
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
  countries: any;
  state: State[] = [];
  constructor(
    @Inject(OfficeLocationsConfig) config: IEditorConfig<OfficeLocation>,
    private countryStateService: CountryStatesService
  ) {
    super(config);
  }

  ngOnInit(): void {
    this.countries = this.countryStateService.getCounries();
  }
  validationMaxlength = (item: OfficeLocation): number => item.country === 'US' ? 5 : 10;
  validationMinlength = (item: OfficeLocation): number => item.country === 'US' ? 5 : 1;

  changeCompany(index: number = null, firstLoad: boolean = false): any {
    if (index !== null) {
      const _country = this.countries.find(x => x.countryShortCode === this.entities[index].country);
      if (_country) {this.state = _country.regions; }
      if (!firstLoad) { this.entities[index].state = null; }
    } else {
      if (this.entity.country) {

      }
    }
  }

  onDelete(item: OfficeLocation): void {
    const status = !item.isActive ? 'enable' : 'disable';
    this.confirm.show('confirm', `Are you sure you\'d like to ${status} this item?`)
      .then(res => {
        if (res) {
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
