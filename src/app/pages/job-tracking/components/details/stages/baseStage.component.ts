import {OnInit, Inject, ViewChild, Directive} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import {
  CompanyContactsService,
  CompanyResourceService,
  InterviewOutcomeService,
  InterviewTypeService,
  JobTrackingService,
  TradesService
} from '../../../../../core/data';
import {
  ApplicationProgram,
  Company, CompanyContacts,
  CompanyTrade,
  EmploymentCompany,
  EmploymentStageV2, InterviewOutcome,
  InterviewStage,
  InterviewType
} from '../../../../../core/model';
import {GoogleMapComponent} from '../../../../../core/components/googleMap';
import {NotificationService, ObservableService} from '../../../../../common/services';
import {ConfirmComponent} from '../../../../../common/components/confirm';
import {IResourceService} from '../../../../../common/interfaces';

@Directive()

export class BaseStateDirective implements OnInit {
    @ViewChild(GoogleMapComponent) googleMapComponent: GoogleMapComponent;
    @ViewChild(ConfirmComponent) confirm: ConfirmComponent;

    protected applId: number;
    protected employmentCompany: EmploymentCompany;
    protected applTrades: ApplicationProgram[] = [];
    protected stage: EmploymentStageV2;
    itemEdit: InterviewStage;
    showMaps: boolean;
    selectCompanyTrades: CompanyTrade[] = [];
    selectCompanyOtherTrades: CompanyTrade[] = [];


    constructor(
        @Inject(ActivatedRoute) public route: ActivatedRoute,
        @Inject(NotificationService) public notificationSvc: NotificationService,
        @Inject(ObservableService) public observableSvc: ObservableService,
        @Inject(TradesService) public tradesSvc: TradesService,
        @Inject(InterviewTypeService) protected interviewTypeSvc: IResourceService<InterviewType>,
        @Inject(InterviewOutcomeService) protected interviewOutcomeSvc: IResourceService<InterviewOutcome>,
        @Inject(CompanyContactsService) protected contactSvc: IResourceService<CompanyContacts>,
        @Inject(CompanyResourceService) protected companySvc: IResourceService<Company>,
        protected employmentSvc: JobTrackingService,
    ) {

    }

    ngOnInit(): void {
        this.route.params
            .subscribe(params => {
                if (params && params.id) {
                    this.applId = params.id;
                }
            });
    }

    observableSource(keyword: any): void {
        return this.observableSvc.observableSourceCompanies.bind(keyword);
    }

    getTradeById(trade: CompanyTrade): string {
        return trade.trade > 0 ? this.tradesSvc.getTradesById(trade.trade) : trade.name;
    }

    showMap(): void {
        this.showMaps = true;
        this.googleMapComponent.onShowMap(this.applId);
    }

}
