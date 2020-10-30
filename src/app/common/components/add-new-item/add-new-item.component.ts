import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ObservableService } from '../../services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-new-item',
    templateUrl: './add-new-item.component.html',
    styleUrls: ['add-new-item.component.scss'],
    providers: [ObservableService],
})

export class AddNewItemComponent {
  @Output() clickOk = new EventEmitter();
  @Input() link: string;
  @Input() isEmployment: boolean;
  @Input() forType: string;
  @Input() filter = '';
  @Input() detailId: string = null;
  @Input() userName = '';
  @Input() addId = false;
  @Input() addVeteran = false;
  sourceCompany: any;
  showErr = false;
  hide = true;

  constructor(
    private observableSvc: ObservableService,
    private router: Router,
  ) {

  }

  observableSource(keyword: any): any {
    if (this.sourceCompany && this.sourceCompany.id) {
      this.showErr = false;
    }
    if (this.forType) {
      return this.observableSvc.observableSourceTypeProfile.bind(keyword, this.forType, this.filter);
    } else {
      if (this.addVeteran) {
        return this.observableSvc.observableSourceVeteranProfile.bind(keyword);
      } else {
        return this.observableSvc.observableSourceProfile.bind(keyword);
      }
    }
  }

  show = () => {
    if (this.userName) {
      if (this.detailId) {
        this.router.navigate([this.link, this.detailId, this.userName, '']);
      } else {
        this.sourceCompany = this.userName;
        this.hide = false;
      }
    } else {
      this.hide = false;
    }
  }

  onOk(): void {
    if (this.sourceCompany && this.sourceCompany.id) {
      const name = `${this.sourceCompany.firstName} ${this.sourceCompany.lastName}`;
      if (this.isEmployment) {
        if (this.sourceCompany.properties.CanHillerHousingAllowance) {
          this.router.navigate([this.link, this.sourceCompany.properties.HillerEmploymentId, name]);
          this.hide = true;
        } else {
          this.showErr = true;
        }
      } else {
        if (this.addId) {
          this.router.navigate([this.link, this.sourceCompany.id, name, '']);
        } else {
          this.router.navigate([this.link, this.sourceCompany.id, name]);
        }
        this.hide = true;
      }
    } else {
      this.showErr = true;
    }
  }

  cancel(): void {
    this.sourceCompany = null;
    this.hide = true;
    this.showErr = false;
  }

}
