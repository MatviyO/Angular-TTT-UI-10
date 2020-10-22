import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DetailsStateful, IEditorStatefulConfig, IDataService, ObservableService, ConfirmComponent, IResourceService } from '@ttt/common';
import { Profile, MilitaryBase, OrientationEvent, OrientationEventApplication } from '@ttt/core/model';
import { ClassesService, MilitaryBaseService, OrientationEventResourceService } from '@ttt/core/data';
import { OrientationEventDetailsConfig } from './orientation-event.details.config';
import { AddNewSelectItemComponent } from 'app/core';
import { OrientationEventService } from '../../orientation-event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryStatesService, State } from 'app/core/data/country-state.service';
import * as moment from 'moment';


@Component({
    selector: 'app-orientation-event.details',
    templateUrl: './orientation-event.details.component.html',
    styleUrls: ['./../../../events.component.scss'],
    providers: [OrientationEventDetailsConfig, ClassesService, CountryStatesService, ObservableService, MilitaryBaseService],
})

export class OrientationEventDetailsComponent extends DetailsStateful<OrientationEvent> implements OnInit {

    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
    @ViewChild(AddNewSelectItemComponent) addNewItem: AddNewSelectItemComponent;

    private application: Profile;
    private orientationEvents: OrientationEvent[] = [];
    private moveAttendee: OrientationEventApplication;
    private copyDeleteAttendee: OrientationEventApplication;
    private newEventId: number;
    militaryBases: MilitaryBase[] = [];
    isChangeEvent: boolean = false;
    editItem: OrientationEventApplication = null;
    newItem: OrientationEventApplication = null;
    countries = this.countrySvc.getCounries();
    states: State[] = [];

    constructor(
        @Inject(OrientationEventDetailsConfig) config: IEditorStatefulConfig<OrientationEvent>,
        @Inject(MilitaryBaseService) protected militarySvc: IResourceService<MilitaryBase>,
        @Inject(OrientationEventResourceService) protected orientEventResourceSvc: IDataService<OrientationEvent>,
        @Inject(OrientationEventService) protected orientEventSvc: IDataService<OrientationEvent>,
        private observableSvc: ObservableService,
        private countrySvc: CountryStatesService,
    ) {
        super(config);
        super.onDataLoaded((x) => this.dataLoaded(x));
    }

    dataLoaded(data: OrientationEvent) {
        if (this.entity.country) {
            this.changeCompany(true);
        }
    }

    validationMaxlength = (item: OrientationEvent): number => item.country === 'US' ? 5 : 10;
    validationMinlength = (item: OrientationEvent): number => item.country === 'US' ? 5 : 1;

    changeCompany(firstLoad: boolean = false) {
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

    ngOnInit(): void {
        super.ngOnInit();
        this.entity.date = moment(new Date()).format('L') as any;

        this.militarySvc.query()
            .then((res: MilitaryBase[]) => this.militaryBases = res)
            .catch(err => this.onHttpError(err));
    }

    onSave(form: { valid: boolean; _submitted: boolean; }): void {
        event.returnValue = false;
        if (form.valid) {
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

    confirmDedleteAttendee = (attendee: OrientationEventApplication): void => {
        this.confirm.show('confirm', `Are you sure you would like to delete ${attendee.application.firstName} ${attendee.application.lastName} from this event?`)
            .then((answer: boolean) => {
                if (answer) {
                    this.deleteAttendee(attendee);
                }
            });
    }

    deleteAttendee = (attendee: OrientationEventApplication): Promise<OrientationEvent> => {
        this.entity.attendees.forEach((attendeeItem: OrientationEventApplication, i: number) => {
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
                .catch(err => {
                    this.application = null;
                    this.entity.attendees.splice(-1, 1);
                });
        }
    }
    onHttpError(err: HttpErrorResponse) {
        if (err.error.ErrorCode === 104) {
            this.notificationSvc.warning('Orientation Event details', "Applicant you're trying to add already attends orientation event.");
            this.showLoadData = false;
        } else {
            super.onHttpError(err);
        }
    }

    changeEvent = (attendee: OrientationEventApplication): void => {
        this.newEventId = this.entity.id;
        this.moveAttendee = attendee;
        this.isChangeEvent = true;
        this.orientEventResourceSvc.query()
            .then((res: any) => {
                this.orientationEvents = res.sort((a: OrientationEvent, b: OrientationEvent) => new Date(b.date).getTime() - new Date(a.date).getTime());
            })
            .catch(err => this.onHttpError(err));
    }
    createNewItem = () => {
        this.newItem = new OrientationEventApplication();
    }

    moveAttendeeEvent = (): void => {
        const _attendee = new OrientationEventApplication();
        _attendee.applicationId = this.moveAttendee.applicationId;
        _attendee.notes = this.moveAttendee.notes;
        _attendee.attended = false;
        _attendee.confirmed = false;
        _attendee.eventId = +this.moveAttendee.id;

        let _event: OrientationEvent;
        this.orientationEvents.forEach((orientEvent: OrientationEvent) => {
            if (orientEvent.id === +this.newEventId) {
                orientEvent.attendees.push(_attendee);
                _event = orientEvent;
            }
        });

        this.deleteAttendee(this.moveAttendee)
            .then(() => {
                this.orientEventSvc.update(_event);
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
