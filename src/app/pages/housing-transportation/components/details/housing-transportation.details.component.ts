import { Component, OnInit, Inject } from '@angular/core';
import { HousingTransportationDetailsConfig } from './housing-transportation.details.config';
import {DetailsStatefulWithTriggersDirective} from '../../../../common/base-classes';
import {HouseTransportationOptions, HousingTransportation, Transportation} from '../../../../core/model/housing-transportation';
import {HousingtranportationOptionsService, TransportationService} from '../../../../core/data';
import {IEditorStatefulWithTriggersConfig, IResourceService} from '../../../../common/interfaces';
import {CountryStatesService} from '../../../../core/data/country-state.service';
import {Trigger} from '../../../../core/model';


@Component({
    selector: 'app-housing-transportation-details',
    templateUrl: './housing-transportation.details.component.html',
    styleUrls: ['housing-transportation.details.component.scss'],
    providers: [HousingTransportationDetailsConfig, CountryStatesService],
})

export class HousingTransportationDetailsComponent extends DetailsStatefulWithTriggersDirective<HousingTransportation> implements OnInit {
    houseOptions: HouseTransportationOptions[] = [];
    transportations: Transportation[] = [];

    constructor(
        @Inject(HousingTransportationDetailsConfig) config: IEditorStatefulWithTriggersConfig<HousingTransportation>,
        @Inject(HousingtranportationOptionsService) private housingOptionSvc: IResourceService<HouseTransportationOptions>,
        @Inject(TransportationService) private transportSvc: IResourceService<Transportation>,
        private countrySvc: CountryStatesService,
    ) {
        super(config);
        super.onDataLoaded((x) => this.dataLoaded(x));
        this.onTriggerLoaded((x) => this.hasTrigger(x));
    }

    ngOnInit(): void {
        this.housingOptionSvc.query()
            .then((res: HouseTransportationOptions[]) => this.houseOptions = res)
            .catch((e) => this.onHttpError(e));

        this.transportSvc.query()
            .then((res: Transportation[]) => this.transportations = res)
            .catch((e) => this.onHttpError(e));
        super.ngOnInit();
    }

    hasTrigger(triggers: Trigger[]): void {
        if (triggers) {
            if (triggers.find(x => x.mainObjectId === this.entity.id && x.objectId === null)) {
                this.entity.hasTrigger = true;
            }
        }
    }

    dataLoaded(data: HousingTransportation): void {
        if (!data.id) {
            this.entity = new HousingTransportation();
            this.entity.classParticipant.appUserId = +this.queryParams['userId'];
            this.navigation.addNavigation(`${this.queryParams['name']}`, `/profile/details/${this.entity.classParticipant.appUserId}`);
        } else {
            if (data.classParticipant && data.classParticipant.appUser) {
                this.navigation.addNavigation(`${data.classParticipant.appUser.firstName} ${data.classParticipant.appUser.lastName}`, `/profile/details/${this.entity.classParticipant.appUserId}`);
            } else {
                if (this.queryParams['name']) {
                    this.navigation.addNavigation(`${this.queryParams['name']}`, `/profile/details/${this.queryParams['userId']}`);
                }
            }
        }
    }

    onSave(form): void {
        event.returnValue = false;
        if (form.valid) {
            if (!this.entity.housingOptionId && this.entity.isBooked) {
                this.notificationSvc.info('Housing & Transportation', `Please select hotel before setting "Booked" flag.`);
            } else {
                this.entity.needsHousing = this.entity.housingOptionId >= 0 ? true : false;
                if (!this.entity.id) {
                    this.entity.classParticipantId = this.queryParams['participantId'];
                }
                super.save();
            }
        } else {
            form._submitted = true;
            this.showLoadData = false;
            this.notificationSvc.warning('info', 'Please fill in required fields');
        }
    }

    goBack() {
        this.navigation.clear();
        this.router.navigate(['/housing-transportation/list']);
    }

    getFullAddress = (item: HouseTransportationOptions): string => {
            let _address = '';
            if (item) {
                if (item.name) {
                    _address += `${item.name} |`;
                }
                if (item.country) {
                    const _country = this.countrySvc.getFullCountryName(item.country);
                    if (_country) {
                        _address += ` ${_country}`;
                        if (item.state) {
                            const _state = this.countrySvc.getFullStateName(item.country, item.state);
                            if (_state) {
                                _address += ` | ${_state}`;
                            }
                        }
                    }
                }
                if (item.city) {  _address += ` | ${item.city}`; }
                if (item.address) {  _address += ` | ${item.address}`; }
                if (item.zip) {  _address += ` | ${item.zip}`; }
            }
            return _address;
    }
}

