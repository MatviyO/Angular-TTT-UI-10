import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { RegistrationEventDetailsConfig } from './registration-event.details.config';
import { RegistrationEventService } from '../../registration-event.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import {DetailsStatefulDirective} from '../../../../../common/base-classes';
import {MilitaryBase} from '../../../../../core/model/properties';
import {Profile, RegistrationEvent, RegistrationEventApplication} from '../../../../../core/model';
import {AddNewSelectItemComponent} from '../../../../../core/components/add-new-item-select';
import {CountryStatesService, State} from '../../../../../core/data/country-state.service';
import {IDataService, IEditorStatefulConfig, IResourceService} from '../../../../../common/interfaces';
import {ClassesService, MilitaryBaseService, RegistrationEventResourceService} from '../../../../../core/data';
import {ConfirmComponent} from '../../../../../common/components/confirm';
import {ObservableService} from '../../../../../common/services';

@Component({
    selector: 'app-registration-event.details',
    templateUrl: './registration-event.details.component.html',
    styleUrls: ['./../../../events.component.scss'],
    providers: [RegistrationEventDetailsConfig, ClassesService, CountryStatesService, ObservableService, MilitaryBaseService],
})

export class RegistrationEventDetailsComponent extends DetailsStatefulDirective<RegistrationEvent> implements OnInit {

    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
    @ViewChild(AddNewSelectItemComponent) addNewItem: AddNewSelectItemComponent;

    private application: Profile;
    private registrationEvents: RegistrationEvent[] = [];
    private moveAttendee: RegistrationEventApplication;
    private copyDeleteAttendee: RegistrationEventApplication;
    private newEventId: number;
    militaryBases: MilitaryBase[] = [];
    newItem: RegistrationEventApplication = null;
    editItem: RegistrationEventApplication = null;
    isChangeEvent = false;
    countries = this.countrySvc.getCounries();
    states: State[] = [];

    constructor(
        @Inject(RegistrationEventDetailsConfig) config: IEditorStatefulConfig<RegistrationEvent>,
        @Inject(MilitaryBaseService) protected militarySvc: IResourceService<MilitaryBase>,
        @Inject(RegistrationEventService) protected regEventSvc: IDataService<RegistrationEvent>,
        @Inject(RegistrationEventResourceService) protected regEventResourceSvc: IDataService<RegistrationEvent>,
        private observableSvc: ObservableService,
        private countrySvc: CountryStatesService,
    ) {
        super(config);
        super.onDataLoaded((x) => this.dataLoaded(x));
    }

    dataLoaded(data: RegistrationEvent): void {
        if (this.entity.country) {
            this.changeCompany(true);
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.entity.date = moment(new Date()).format('L') as any;

        this.militarySvc.query()
            .then((res: MilitaryBase[]) => this.militaryBases = res)
            .catch(err => this.onHttpError(err));
    }

    validationMaxlength = (item: RegistrationEvent): number => item.country === 'US' ? 5 : 10;
    validationMinlength = (item: RegistrationEvent): number => item.country === 'US' ? 5 : 1;

    changeCompany(firstLoad: boolean = false): void {
        if (this.entity.country) {
            const _country = this.countries.find(x => x.countryShortCode === this.entity.country);
            if (_country) { this.states = _country.regions; }
            if (!firstLoad) { this.entity.state = null; }
        } else {
            this.entity.state = null;
            this.states = [];
        }
    }

    changeMilitaryBase = () => {
        const _base = this.militaryBases.find(x => x.id === this.entity.baseId);
        this.entity.country = _base ? _base.country : null;
        const _country = this.countries.find(x => x.countryShortCode === this.entity.country);
        if (_country) { this.states = _country.regions; }
        this.entity.state = _base ? _base.state : null;
        this.entity.city = _base ? _base.city : null;
        this.entity.address = _base ? _base.address : null;
        this.entity.zip = _base ? +_base.zip : null;
    }

    createNewItem = () => {
        this.newItem = new RegistrationEventApplication();
    }

    onSave(form: { valid: boolean; _submitted: boolean; }): void {
        event.returnValue = false;
        if (form.valid) {
            if (!this.entity.registrationAllowed) {
                this.entity.registrationAllowed = false;
            }
            super.save();
        } else {
            form._submitted = true;
            this.showLoadData = false;
            this.notificationSvc.warning('info', 'Please fill in required fields');
        }
    }

    editAttendee = (i: number) => this.editItem = Object.assign({}, this.entity.attendees[i]);


    updateAttendee = (i: number): void => {
        this.entity.attendees[i] = this.editItem;
        super.save().then(() => this.editItem = null);
    }

    confirmDedleteAttendee = (attendee: RegistrationEventApplication): void => {
        this.confirm.show('confirm', `Are you sure you would like to delete ${attendee.application.firstName} ${attendee.application.lastName} from this event?`)
            .then((answer: boolean) => {
                if (answer) {
                    this.deleteAttendee(attendee);
                }
            });
    }

    deleteAttendee = (attendee: RegistrationEventApplication): Promise<RegistrationEvent> => {
        this.entity.attendees.forEach((attendeeItem: RegistrationEventApplication, i: number) => {
            if (attendeeItem.id === attendee.id) {
                this.copyDeleteAttendee = Object.assign({}, this.entity.attendees[i]);
                this.entity.attendees.splice(i, 1);
            }
        });
        return super.save();
    }

    addAttendee = (): void => {
        if (this.application) {
            this.newItem.application = this.application;
            this.newItem.applicationId = this.application.id;
            this.newItem.eventId = this.entity.id;

            this.entity.attendees.push(this.newItem);
            super.save()
                .then(() => {
                    this.newItem = null;
                    this.application = null;
                })
                .catch(() => {
                    this.application = null;
                    this.entity.attendees.splice(-1, 1);
                });
        }
    }

    onHttpError(err: HttpErrorResponse): any {
        if (err.error && err.error.ErrorCode === 104) {
            this.notificationSvc.warning('Registration Event details', 'Applicant you\'re trying to add already attends another registration event.');
            this.showLoadData = false;
        } else {
            super.onHttpError(err);
        }
    }

    changeEvent = (attendee: RegistrationEventApplication): void => {
        this.newEventId = this.entity.id;
        this.moveAttendee = attendee;
        this.isChangeEvent = true;
        this.regEventResourceSvc.query()
            .then((res: any) => {
                this.registrationEvents = res.sort((a: RegistrationEvent, b: RegistrationEvent) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime());
            })
            .catch(err => this.onHttpError(err));
    }

    moveAttendeeEvent = (): void => {
        const _attendee = new RegistrationEventApplication();
        _attendee.applicationId = this.moveAttendee.applicationId;
        _attendee.notes = this.moveAttendee.notes;
        _attendee.attended = false;
        _attendee.confirmed = false;
        _attendee.eventId = +this.moveAttendee.id;

        let _event: RegistrationEvent;
        this.registrationEvents.forEach((regEvent: RegistrationEvent) => {

            if (regEvent.id === +this.newEventId) {
                regEvent.attendees.push(_attendee);
                _event = regEvent;
            }
        });

        this.deleteAttendee(this.moveAttendee)
            .then(() => {
                this.regEventSvc.update(_event);
                this.newEventId = null;
                this.moveAttendee = null;
                this.isChangeEvent = false;
                this.copyDeleteAttendee = null;
            })
            .catch(() => this.entity.attendees.push(this.copyDeleteAttendee));
    }

    observableSource(keyword: string): Profile {
        return this.observableSvc.observableSourceProfile.bind(keyword);
    }

    getMilitaryBaseById = (id: number): string => {
        let name = '';
        const military = this.militaryBases.find((x: MilitaryBase) => x.id === id);
        if (military) {
            name = military.name;
        }
        return name;
    }

}
