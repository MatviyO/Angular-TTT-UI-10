import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { ExitsComponent, CommunicationCompanyComponent, ApplicationNoteComponent } from './components';
import { ProfileDetailsConfig } from './details.config';
import {DetailsStatefulWithTriggersDirective} from '../../../../common/base-classes';
import {
  ApplicationProgram, ApplicationType,
  CompanyCommunicationHistory,
  MilitaryBase, MilitaryBranch,
  Profile, ProgramExit,
  Rank, Location,
  Reference,
  RegistrationEvent, RegistrationEventApplication,
  Trade, Trigger
} from '../../../../core/model';
import {SelectCountryStateComponent} from '../../../../common/components/selectCountryState';
import {
  AffiliationTypesService,
  CommunicationHistoryResourceService,
  HearAboutProgramService, MilitaryBaseService, MilitaryService,
  RankResourceService,
  TradesService
} from '../../../../core/data';
import {ApplicationAffiliationService} from '../../../../core/data/application-affiliation.service';
import {Params} from '@angular/router';
import {CountryStatesService, State} from '../../../../core/data/country-state.service';
import {AffiliationType} from '../../../../core/model/properties/application-affiliation';
import {IEditorStatefulWithTriggersConfig, IResourceService} from '../../../../common/interfaces';
import {ConfirmComponent} from '../../../../common/components/confirm';
import {BaPictureUploaderComponent} from '../../../../theme/components/baPictureUploader/baPictureUploader.component';


class TradeAppl extends Trade {
  admitted: boolean;
}

@Component({
  selector: 'app-profile-details',
  templateUrl: './details.component.html',
  styleUrls: ['details.component.scss'],
  providers: [ProfileDetailsConfig, ApplicationAffiliationService, AffiliationTypesService, CommunicationHistoryResourceService],
})


export class ProfileDetailsComponent extends DetailsStatefulWithTriggersDirective<Profile> implements OnInit {

  @ViewChild(CommunicationCompanyComponent) commHistory: CommunicationCompanyComponent;
  @ViewChild(ApplicationNoteComponent) applNoteComponent: ApplicationNoteComponent;
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
  @ViewChild(ExitsComponent) exitsComponent: ExitsComponent;
  @ViewChild(BaPictureUploaderComponent) photoUploader: BaPictureUploaderComponent;
  @ViewChild(SelectCountryStateComponent) selectCountryState: SelectCountryStateComponent;

  maskUS = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  section: string;
  maxDOB: string;
  myDate: Date = new Date();
  dateBonus: Date = new Date();
  photo: any;
  activePage: boolean;
  asvab = false;
  showSsn = false;
  military = false;
  locition = false;
  hillerProgres = 0;
  _hillerProgres: string;
  hasCampbellStrong = false;
  awaitingCreateCampbellStrong = false;

  ranks: Rank[] = [];
  states: State[] = [];
  baseName: MilitaryBase[];
  programSource: Reference[];
  militaryBranch: MilitaryBranch[];
  registrationEvents: RegistrationEvent[];
  campbelStrongAffiliation: AffiliationType;
  companyHistories: CompanyCommunicationHistory[] = [];
  countries = this.countrySvc.getCounries();
  programs = this.tradesSvc.getTrades();


  constructor(
    @Inject(ProfileDetailsConfig) config: IEditorStatefulWithTriggersConfig<Profile>,
    @Inject(HearAboutProgramService) private programSvc: IResourceService<Reference>,
    @Inject(MilitaryService) private militarySvc: IResourceService<MilitaryBranch>,
    @Inject(MilitaryBaseService) private baseNameSvc: IResourceService<MilitaryBase>,
    @Inject(CommunicationHistoryResourceService) private companyHistorySvc: IResourceService<CompanyCommunicationHistory>,
    private affiliationSvc: ApplicationAffiliationService,
    private affiliationTypesSvc: AffiliationTypesService,
    private countrySvc: CountryStatesService,
    private rankSvc: RankResourceService,
    private tradesSvc: TradesService,
  ) {
    super(config);
    super.onDataLoaded((p) => this.dataLoaded(p));
  }

  validationMaxlength = (item: Profile): number => item.country === 'US' ? 5 : 10;
  validationMinlength = (item: Profile): number => item.country === 'US' ? 5 : 1;

  changeCompany(firstLoad: boolean = false): any {
    if (this.entity.country) {
      const _country = this.countries.find(x => x.countryShortCode === this.entity.country);
      if (_country) { this.states = _country.regions; }
      if (!firstLoad) { this.entity.state = null; }
    } else {
      this.entity.state = null;
      this.states = [];
    }
  }

  changeLocationCompany(object: { country: string, state: string }, i: any): any {
    this.entity.preferredLocations[i].country = object.country;
    this.entity.preferredLocations[i].state = object.state;
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params.key && params.section) {
            this.section = params.section;
          }
        },
      );
    super.ngOnInit();

    this.programSvc.query('', '', null, 'null', 'id;description;isActive')
      .then(data => this.programSource = data)
      .catch((e) => this.onHttpError(e));

    this.rankSvc.query('', '', null, 'null', 'id;description;isActive')
      .then(data => this.ranks = data)
      .catch((e) => this.onHttpError(e));

    this.militarySvc.query('', '', null, 'null', 'id;description;isActive')
      .then(data => this.militaryBranch = data)
      .catch((e) => this.onHttpError(e));

    this.baseNameSvc.query('', '', null, 'null')
      .then(data => this.baseName = data)
      .catch((e) => this.onHttpError(e));

    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    this.maxDOB = date.toJSON().split('T')[0];
  }

  changeCampbellStrongAffiliation(): void {
    if (this.hasCampbellStrong) {
      if (this.entity.id) {
        const index = this.entity.affiliations.findIndex(x => x.affiliationTypeId === this.campbelStrongAffiliation.id);
        if (index >= 0) {
          this.showLoadData = true;
          this.affiliationSvc.delete(this.entity.affiliations[index])
            .then(() => {
              this.entity.affiliations.splice(index, 1);
              this.hasCampbellStrong = false;
              this.showLoadData = false;
            })
            .catch(err => this.onHttpError(err));
        } else {
          this.notificationSvc.error('Affiliation', 'Can\'t find Campbell Strong Affiliation.');
        }
      } else {
        this.hasCampbellStrong = false;
        this.awaitingCreateCampbellStrong = false;
      }
    } else {
      if (this.campbelStrongAffiliation) {
        if (this.entity.id) {
          this.showLoadData = true;
          const applAffiliation: any = {
            affiliationTypeId: this.campbelStrongAffiliation.id,
            appUserId: this.entity.id,
          };
          this.affiliationSvc.create(applAffiliation)
            .then(res => {
              this.hasCampbellStrong = true;
              this.entity.affiliations.push(res);
              this.showLoadData = false;
            })
            .catch(err => this.onHttpError(err));
        } else {
          this.hasCampbellStrong = true;
          this.awaitingCreateCampbellStrong = true;
        }
      } else {
        this.notificationSvc.error('Affiliation', 'Can\'t find Campbell Strong Affiliation.');
      }
    }
  }

  dataLoaded(data: Profile): void {
    this.affiliationTypesSvc.query('description.contains("Campbell")', '', null, 'null')
      .then(res => {
        if (res && res.length > 0) {
          this.campbelStrongAffiliation = res[0];
          if (this.entity && this.entity.affiliations && this.entity.affiliations.length > 0) {
            this.hasCampbellStrong = !!this.entity.affiliations.find(x => x.affiliationTypeId === res[0].id);
          }
        }
      })
      .catch((e) => this.onHttpError(e));

    if (data.hasPhoto) {
      this.photo = true;
    }
    if (this.entity.country) {
      this.changeCompany(true);
    }
    if (data.id > 0) {
      if (!data.registrationEvent) {
        data.registrationEvent = new RegistrationEventApplication();
      }
      this.companyHistorySvc.query(`applicationId==${data.id}`)
        .then(res => {
          this.companyHistories = res;
          if (this.section === 'commHist') {
            $('#commCompany').click();
            this.commHistory.load(data.id, this.companyHistories, this.state.data);
          } else {
            this.commHistory.load(data.id, this.companyHistories);
          }
        })
        .catch(this.onHttpError);

      if (this.section === 'exit') {
        $('#exit').click();
        this.exitsComponent.restore(this.state.data);
      }
      this.applNoteComponent.load(data.communicationHistory, this.entity.id);
    }
    if (!data.isActive && data.id) {
      $('#exit').click();
    }
    this.programs.forEach((x: TradeAppl) => {
      x.admitted = this.entity.programsAdmittedTo.findIndex(p => p.programType === x.id) >= 0;
    });
  }

  getTriger = (entity: Profile, type: string): void => {
    if (!entity.id) {
      return;
    }
    const types = `Trigger: ${this.componentTitle}`;
    // this.triggersSvc.queryByCategory('6&cats=1&', `applicationId==${entity.id} and(Severity=="0" or Severity=="1" or Severity=="2")`)
    this.triggersSvc.queryByCategory('6&cats=1&', `applicationId==${entity.id}`)
      .subscribe(
        (res: Trigger[]) => {
          if (res.length > 0) {
            res.forEach(item => {
              if (item.triggerCategory === 6) {
                this.hillerProgres = item.value * 100;
                this._hillerProgres = this.hillerProgres.toFixed(2);
                if (this.hillerProgres >= 100) {
                  this.notificationSvc.notify(item.severity, types, 'Hiller bonus no send');
                }
              }
              if (item.triggerCategory === 1) {
                const trigStr = `${this.triggerHelper.getTriggerType(item.triggerType)} ${this.triggerHelper.getDays(item.value, item.isApproaching)}`;
                this.notificationSvc.notify(item.severity, types, `${trigStr}`);
              }
            });
          }
        },
        err => this.onHttpError(err),
      );
  }

  sendBonus(form: { valid: boolean; _submitted: boolean; }): void {
    this.entity.hillerBonusPaidDate = this.formatedDate(this.dateBonus) as Date;
    this.onSave(form);
  }

  onSave(form: any): void {
    if (this.entity.phone && this.entity.phone.length > 0) {
      if (this.entity.country === 'US') {
        this.entity.phone = this.parsePhone(this.entity.phone);
      }
    } else {
      this.entity.phone = null;
    }
    if (!this.entity.ptdy) {
      this.entity.ptdy = false;
    }

    event.returnValue = false;
    if (form.valid) {
      this.showLoadData = true;
      this.section = null;
      if (this.entity.ssn && this.entity.dateOfBirth) {
        let url = `ssn.contains("${this.entity.ssn}") and dateOfBirth="${this.entity.dateOfBirth}" `;
        if (this.entity.id) {
          url = `id!=${this.entity.id} and ssn.contains("${this.entity.ssn}") and dateOfBirth="${this.entity.dateOfBirth}" `;
        }
        this.dataSvc.query(url)
          .then(res => {
            if (res.length > 0) {
              this.showLoadData = false;
              this.confirm
                .show('alert', `User profile (${res[0].firstName} ${res[0].lastName}) with the same SSN and DoB already exists.`);
            } else {
              this.entity.isActive = true;
              this.saveProfile();
            }
          });
      } else {
        this.saveProfile();
      }
    } else {
      form._submitted = true;
      this.notificationSvc.warning('info', 'Please fill in required fields');
    }
  }

  saveProfile(): void {
    if (this.entity.type !== ApplicationType.Military && !this.entity.id) {
      this.entity.type = ApplicationType.Military;
    }
    if (this.entity.facebookProfile === '') {
      this.entity.facebookProfile = null;
    }
    if (this.entity.ssn === '') {
      this.entity.ssn = null;
    }
    if (this.entity.linkedInProfile === '') {
      this.entity.linkedInProfile = null;
    }

    if (this.photo) {
      this.showLoadData = true;
      this.entity.hasPhoto = true;
      super.save()
        .then(() => {
          if (this.awaitingCreateCampbellStrong) {
            this.hasCampbellStrong = false;
            this.changeCampbellStrongAffiliation();
            this.awaitingCreateCampbellStrong = false;
          }
          this.photoUploader.startUpload(this.entity.id)
            .catch((e) => this.onHttpError(e));
        });
    } else {
      this.entity.hasPhoto = false;
      super.save()
        .then(() => {
          if (this.awaitingCreateCampbellStrong) {
            this.hasCampbellStrong = false;
            this.changeCampbellStrongAffiliation();
            this.awaitingCreateCampbellStrong = false;
          }
          if (this.photoUploader.isUpdated) {
            this.photoUploader.startRemove()
              .catch((e) => this.onHttpError(e));
          }
        });
    }
  }

  onPhotoUpdated(data: any): any {
    this.photo = data;
  }

  onPhotoRemoved(event: any): any {
    this.entity.hasPhoto = false;
    this.photo = null;
    // super.save();
  }

  addLocation(): void {
    if (this.entity.preferredLocations.length < 3) {
      const loc = new Location();
      loc.priority = this.entity.preferredLocations.length + 1;
      loc.applicationId = this.entity.id;
      this.entity.preferredLocations.push(loc);
    }
  }

  removeLocation(location: Location): void {
    this.confirm.show('confirm', 'Are you sure you\'d like to remove this location?')
      .then(result => {
        if (result) {
          const i = this.entity.preferredLocations.indexOf(location);
          if (i >= 0) {
            this.entity.preferredLocations.splice(i, 1);
          }
        }
      });
  }

  onProgramsAdmitted(program: { admitted: boolean; id: number; }): void {
    program.admitted = !program.admitted;
    if (program.admitted) {
      this.entity.programsAdmittedTo.push(new ApplicationProgram(this.entity.id, program.id));
    } else {
      const i = this.entity.programsAdmittedTo.findIndex(x => x.programType === program.id);
      if (i >= 0) {
        this.entity.programsAdmittedTo.splice(i, 1);
      }
    }
  }

  formatedDate = (inDate: Date): string | Date => {
    if (inDate) {
      inDate = new Date(inDate);
      return `${inDate.getMonth() + 1}/${inDate.getDate()}/${inDate.getFullYear()}`;
    } else {
      return new Date();
    }
  }

  onExit(exitObj: ProgramExit): any {
    const _date = this.formatedDate(exitObj.exitDate);
    exitObj.applicationId = this.entity.id;
    this.entity.isActive = false;
    exitObj.exitDate = _date as Date;
    this.entity.programExits.push(exitObj);
    this.saveProfile();
  }

  onProgramEnter(): void {
    this.entity.isActive = true;
    this.saveProfile();
    $('#profiles').click();
  }
  changeLocalShow(): any {
    this.locition = !this.locition;
  }

  parsePhone = (tell: string): string => tell.slice(0, 14);


}
