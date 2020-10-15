import { Injectable, Inject, Injector } from '@angular/core';
import {Company} from '../../../../../core/model';
import {CompanyService, TriggerService} from '../../../../../core/data';
import {IDataService, IEditorStatefulConfig, ITriggerService} from '../../../../../common/interfaces';


@Injectable()
export class CompanyDetailsConfig implements IEditorStatefulConfig<Company> {
    navigationTitle = 'Company';
    navigationUrlPrefix = 'settings/company';
    cls: new () => any = Company;
    componentTitle = 'Company';
    includes = 'Trades;AlternateLocations;Contacts';

    constructor(
        @Inject(CompanyService) public dataSvc: IDataService<Company>,
        @Inject(TriggerService) public triggersSvc: ITriggerService,
        public injector: Injector,
    ) { }
}
