import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IEditorConfig, IResourceService } from '@ttt/common/interfaces';
import { BaseEditableSortableList, ObservableService, ConfirmComponent } from '@ttt/common';
import { HousingTransportationListConfig } from './housing-transportation.list.config';
import { HousingTransportation, HouseTransportationOptions, Transportation } from 'app/core/model/housing-transportation';
import { HousingtranportationOptionsService, Profile, ScheduledClass, TransportationService, ClassesScheduleService } from 'app/core';
import { Observable } from 'rxjs';
import { CountryStatesService } from 'app/core/data/country-state.service';

@Component({
    selector: 'app-housing-transportation-list',
    templateUrl: './housing-transportation.list.component.html',
    styleUrls: ['housing-transportation.list.component.scss'],
    providers: [HousingTransportationListConfig, CountryStatesService],
})

export class HousingTransportationListComponent extends BaseEditableSortableList<HousingTransportation> implements OnInit {
    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
    protected route: ActivatedRoute;
    protected queryParams: Params;
    sourceProfile: Profile;
    classes: ScheduledClass[] = [];
    houseOptions: HouseTransportationOptions[] = [];
    transportations: Transportation[] = [];
    addNewHousing = false;
    errorMessage: string;
    participantId: number;
    newHousingClassId: number;
    classesLoaded: boolean = false;
    awaitClassesLoaded: boolean = false;

    constructor(
        @Inject(HousingTransportationListConfig) config: IEditorConfig<HousingTransportation>,
        @Inject(HousingtranportationOptionsService) private housingOptionSvc: IResourceService<HouseTransportationOptions>,
        @Inject(TransportationService) private transportSvc: IResourceService<Transportation>,
        @Inject(ClassesScheduleService) private classesSvc: IResourceService<ScheduledClass>,
        private observableSvc: ObservableService,
        private countrySvc: CountryStatesService,
        private router: Router,
    ) {
        super(config);
        this.route = config.injector.get(ActivatedRoute);
        super.onDataLoaded((x: any) => this.dataLoaded(x));
    }

    ngOnInit(): void {
        this.housingOptionSvc.query('', '', null, 'null')
            .then(res => this.houseOptions = res)
            .catch((e) => this.onHttpError(e));

        this.transportSvc.query('', '', null, 'null')
            .then((res: Transportation[]) => this.transportations = res)
            .catch((e) => this.onHttpError(e));

        this.route.params
            .subscribe(
                (params: any) => {
                    if (params && params.userName && params.userId) {
                        this.filter.name = params.userName;
                        if (this.navigation.navs.length === 0) {
                            this.navigation.addNavigation(params.userName, `/profile/details/${params.userId}`);
                        }
                        this.showfilter = true;
                        this.sourceProfile = params.userName;
                    }
                });
        super.ngOnInit();
    }

    onDelete(item: HousingTransportation): void {
      
        this.confirm.show('confirm', `Are you sure you\'d like to delte this item?`)
            .then(result => {
                if (result) {
                  this.delete(item);
                }
            });

    }

    observableSource(keyword: any): Observable<Profile> {
        if (this.sourceProfile && this.sourceProfile.id && (!this.classesLoaded || !this.awaitClassesLoaded || this.newHousingClassId !== null)) {
            this.errorMessage = '';
        }
        if (this.sourceProfile && this.sourceProfile.id) {
            if (!this.awaitClassesLoaded) {
                this.awaitClassesLoaded = true;
                this.getClassesForUser();
            }
        } else {
            this.awaitClassesLoaded = false;
            this.classesLoaded = false;
            this.newHousingClassId = null;
        }
        return this.observableSvc.observableSourceProfile.bind(keyword);
    }

    getClassesForUser() {
        if (this.sourceProfile && this.sourceProfile.id) {
            this.classesSvc.query(`attendees.any(appUserId=${this.sourceProfile.id}) or reservations.any(appUserId=${this.sourceProfile.id})`, 'id desc', [], 'Program, Participants')
                .then(res => {
                    this.classes = res;
                    this.classesLoaded = true;
                })
                .catch((e) => this.onHttpError(e));
        }
    }

    cancelNewHousing() {
        this.errorMessage = '';
        this.sourceProfile = null;
        this.addNewHousing = null;
        this.participantId = null;
        this.newHousingClassId = null;
    }

    createNewHousing() {
        if (!this.sourceProfile || !this.sourceProfile.id) {
            this.errorMessage = 'Please select a soldier';
            return;
        }
        if (this.newHousingClassId === null) {
            this.errorMessage = 'Please select a class';
            return;
        }
        this.router.navigate([`housing-transportation/details/${this.sourceProfile.id}/${this.sourceProfile.firstName} ${this.sourceProfile.lastName}/null/${this.participantId}`]);
    }

    setParticipantId() {
        const userClass = this.classes.find((x: ScheduledClass) => x.id === this.newHousingClassId);
        if (userClass && userClass.attendees) {
            const _attendee = userClass.attendees.find((x: any) => x.appUserId === this.sourceProfile.id);
            if (_attendee) {
                this.participantId = _attendee.id;
                return;
            }
        }
        if (userClass && userClass.reservations) {
            const _reservation = userClass.reservations.find((x: any) => x.appUserId === this.sourceProfile.id);
            if (_reservation) {
                this.participantId = _reservation.id;
                return;
            }
        }
    }

    dataLoaded(data: HousingTransportation[]) {
        if (this.filter.name) {
            if (data.length > 0) {
                let isDiferentUsers: boolean = false;
                data.forEach((item) => {
                    if (item.classParticipant.appUserId !== data[0].classParticipant.appUserId) {
                        isDiferentUsers = true;
                        return;
                    }
                });
                if (!isDiferentUsers) {
                    this.sourceProfile = (`${data[0].classParticipant.appUser.firstName} ${data[0].classParticipant.appUser.lastName}`) as any;
                    this.filter.name = `${data[0].classParticipant.appUser.firstName} ${data[0].classParticipant.appUser.lastName}`;
                }
            }
        }
    }

    addAutoFocus() {
        if (this.sourceProfile) {
            setTimeout(() => document.getElementById('autoSearch').focus(), 1000);
        }
    }

    getFilterFormatted(): string {
        let filterStr = '';
        if (this.filter.name) {
            const words = this.filter.name.split(' ');
            let fName = '';
            words.forEach((w: string) => {
                if (w) {
                    if (fName) { fName += ' and '; }
                    fName += `(ClassParticipant.AppUser.firstName.contains("${w}") or ClassParticipant.AppUser.lastName.contains("${w}"))`;
                }
            });
            filterStr += `(${fName})`;
        }
        if (this.filter.housing) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `(housingOptionId == ${this.filter.housing})`;
        }
        if (this.filter.transportation) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `(transportationId == ${this.filter.transportation})`;
        }
        if (this.filter.dateFrom) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `(startDate >= ("${this.filter.dateFrom}"))`;
        }
        if (this.filter.dateTo) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `(endDate <= ("${this.filter.dateTo}"))`;
        }
        if (this.filter.booked || this.filter.booked === false) {
            if (filterStr) { filterStr += ' and '; }
            if (this.filter.booked === false) {
                filterStr += `isBooked!=true`;
            } else {
                filterStr += `isBooked==true`;
            }
        }
        return filterStr;
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

