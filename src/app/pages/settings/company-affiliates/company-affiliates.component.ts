import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DiscountResourceService} from '../../../core/data';
import {CompanyAffiliateConfig} from './company-affialates.config';
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
  providers: [CompanyAffiliateConfig, DiscountResourceService],
})
export class CompanyAffiliatesComponent extends BaseEditableListDirective<CompanyAffiliate> implements OnInit {
  @ViewChild(ConfirmComponent) confirm: ConfirmComponent;
  discountes: Discount[] = [];

  constructor(
    @Inject(CompanyAffiliateConfig) config: IEditorConfig<CompanyAffiliate>,
    @Inject(DiscountResourceService) private discountSvc: IResourceService<Discount>,
    private state: GlobalState,
  ) {
    super(config);
  }

  ngOnInit(): any {
    super.ngOnInit();
    this.discountSvc.query()
      .then((res: Discount[]) => this.discountes = res);
  }

  getDiscountById = (id: number): string => {
    const discount = this.discountes.find((x: Discount) => x.id === id);
    if (discount) {
      const value = discount.relativeDiscount ? `${discount.relativeDiscount} %` : `${discount.absolutDiscount} $`;
      return `${discount.description} (${value})`;
    } else {
      return '';
    }
  }

  update(item: any, form: any): any {
    if (!(item.defaultDiscountId >= 0)) {
      item.defaultDiscountId = null;
    }
    super.onSave(item, form);
  }

  onDelete(item: CompanyAffiliate): void {
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
        }
      });
  }
}
