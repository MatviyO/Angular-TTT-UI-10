import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MilitaryBaseConfig} from './military-base.config';
import {BaseEditableListDirective} from '../../../common/base-classes';
import {MilitaryBase} from '../../../core/model/properties';
import {IEditorConfig} from '../../../common/interfaces';
import {CountryStatesService, State} from '../../../core/data/country-state.service';
import {ConfirmComponent} from '../../../common/components/confirm';

@Component({
  selector: 'app-military-base',
  templateUrl: './military-base.component.html',
  styleUrls: ['./military-base.component.scss'],
  providers: [MilitaryBaseConfig]
})
export class MilitaryBaseComponent extends BaseEditableListDirective<MilitaryBase> implements OnInit {
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

  countries: any;
  states: State[] = [];

  constructor(
    @Inject(MilitaryBaseConfig) config: IEditorConfig<MilitaryBase>,
    private countrySvc: CountryStatesService,
  ) {
    super(config);
  }
  ngOnInit(): any {
    super.ngOnInit();
    this.countries = this.countrySvc.getCounries();
  }

  validationMaxlength = (item: MilitaryBase): number => item.country === 'US' ? 5 : 10;
  validationMinlength = (item: MilitaryBase): number => item.country === 'US' ? 5 : 0;

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

  onDelete(item: MilitaryBase): void {
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
