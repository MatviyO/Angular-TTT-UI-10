import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DiscountResourceService} from '../../../core/data';
import {CompanyAffialatesConfig} from './company-affialates.config';
import {BaseEditableListDirective} from '../../../common/base-classes';
import {CompanyAffiliate} from '../../../core/model/properties';
import {Discount} from '../../../core/model/properties/discount';
import {IEditorConfig, IResourceService} from '../../../common/interfaces';
import {GlobalState} from '../../../global.state';
import {ConfirmComponent} from '../../../common/components/confirm';

@Component({
  selector: 'app-company-affiliates',
  templateUrl: './company-affiliates.component.html',
  styleUrls: ['./company-affiliates.component.scss'],
  providers: [CompanyAffialatesConfig, DiscountResourceService],
})
export class CompanyAffiliatesComponent extends BaseEditableListDirective<CompanyAffiliate> implements OnInit {
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
  discountes: Discount[] = [];
  constructor(
    @Inject(CompanyAffialatesConfig) config: IEditorConfig<CompanyAffiliate>,
    @Inject(DiscountResourceService) private discountSvc: IResourceService<Discount>,
    private state: GlobalState ) {
    super(config);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
