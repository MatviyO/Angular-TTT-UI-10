import { Component, ViewChild, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { EmploymentComponentConfig } from './employments.config';
import * as moment from 'moment';
import {BaseEditableListDirective} from '../../../../../../../common/base-classes';
import {IEditorConfig, IEditorStateExt, IResourceService} from '../../../../../../../common/interfaces';
import {EmploymentStatus, NonPlacementReason} from '../../../../../../../core/model/properties';
import {CompanyTrade, EmploymentRecord, EmploymentStageV2, InterviewStageV2} from '../../../../../../../core/model';
import {CountryStatesService} from '../../../../../../../core/data/country-state.service';
import {ConfirmComponent} from '../../../../../../../common/components/confirm';
import {EmploymentStatusService, InterviewStatusHelper, NonPlacementReasonService, TradesService} from '../../../../../../../core/data';

@Component({
  selector: 'app-employments-component',
  templateUrl: './employments.component.html',

  providers: [EmploymentComponentConfig, CountryStatesService, InterviewStatusHelper, EmploymentStatusService, NonPlacementReasonService],
})

export class EmploymentComponent extends BaseEditableListDirective<EmploymentRecord> implements OnInit {
  @Output() onNavigate: EventEmitter<IEditorStateExt> = new EventEmitter<IEditorStateExt>();
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
  nonEmploymentStatus: NonPlacementReason[] = [];
  employmentStatus: EmploymentStatus[] = [];
  companyName = '';

  constructor(
    @Inject(EmploymentComponentConfig) config: IEditorConfig<EmploymentRecord>,
    @Inject(EmploymentStatusService) private employmentStatusSvc: IResourceService<EmploymentStatus>,
    @Inject(NonPlacementReasonService) private nonEmploymentStatusSvc: IResourceService<NonPlacementReason>,
    private tradesSvc: TradesService,
    private countryStateSvc: CountryStatesService = new CountryStatesService(),
  ) {
    super(config);
  }

  ngOnInit(): void { }

  load(companyId: number, companyName: string): void {
    this.take = null;
    this.companyName = companyName;

    super.getData([], `Cast("EmploymentRecord").CompanyTrade.companyId="${companyId}"`);

    this.employmentStatusSvc.query('', '', null, 'null', 'id;description;isActive;type')
      .then(res => this.employmentStatus = res)
      .catch((e) => this.onHttpError(e));

    this.nonEmploymentStatusSvc.query('', '', null, 'null', 'id;description;isActive;type')
      .then(res => this.nonEmploymentStatus = res)
      .catch((e) => this.onHttpError(e));
  }

  getTradeOfCompany = (company: CompanyTrade): string => company.trade > 0 ? this.tradesSvc.getTradesById(company.trade) : company.name;

  getNonEmploymentReasonName = (id: number): string => {
    const _reason = this.nonEmploymentStatus.find(x => x.id === id);
    return _reason ? _reason.description : '';
  }

  getFullAddress = (option: any): string => {
    let _address = ``;
    if (option) {
      if (option.country) {
        const _country = this.countryStateSvc.getFullCountryName(option.country);
        if (_country) {
          _address += ` ${_country}`;
          if (option.state) {
            const _state = this.countryStateSvc.getFullStateName(option.country, option.state);
            if (_state) {
              _address += ` | ${_state}`;
            }
          }
        }
      }
      if (option.city) { _address += ` | ${option.city}`; }
      if (option.address) { _address += ` | ${option.address}`; }
      if (option.zip) { _address += ` | ${option.zip}`; }
    }
    return _address;
  }

  getLatestStage = (stages: EmploymentStageV2[]): EmploymentStageV2 => {
    if (stages && stages.length > 0) {
      const _stages = stages.sort((b, a) => a.index - b.index).sort((b, a) => Date.parse((a.date as string).split('/').reverse().join('-')) - Date.parse((b.date as string).split('/').reverse().join('-')));
      return _stages[0];
    }
    return new EmploymentStageV2();
  }

  getStatusProcess(stages: InterviewStageV2[]): string {
    stages = stages.sort((b, a) => a.index - b.index).sort((b, a) => Date.parse((a.date as string).split('/').reverse().join('-')) - Date.parse((b.date as string).split('/').reverse().join('-')));
    const lastStage = stages[0];
    if (lastStage.recordType === 'InterviewStage') {
      if (lastStage.interviewOutcome) {
        return `${lastStage.interviewOutcome.description} on ${moment(lastStage.date).format('L')}`;
      }
      return `waiting for outcome on ${moment(lastStage.date).format('L')}`;

    } else {
      if (lastStage.status) {
        return `${lastStage.status.description} on ${moment(lastStage.date).format('L')}`;
      }
      return '-';
    }
  }

  showDetails(data: any): any {
    this.onNavigate.emit(data);
  }
}
