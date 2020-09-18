import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ObservableService } from '../../services';
import { Router } from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'addNewItem',
    template: `
    <div *ngIf="!hide" class="main">
        <div class="item">
            <p class="head-title"> Please select soldier to create a new record </p>

            <div class="form-control search">
                <label for="search">
                    <i class="fa fa-search" aria-hidden="true"></i>
                </label>
                <input class="form-control input" name="search" max-num-list='10' value-formatter="firstName lastName" list-formatter="firstName lastName" autocomplete="off"  auto-complete [(ngModel)]="sourceCompany"
                    [source]="observableSource(sourceCompany)" min-chars="3" placeholder='search' match-formatted="true"/>
            </div>

            <p [ngClass]="{'show': showErr}" class="error"> <i class="fa fa-info-circle" aria-hidden="true"></i> Please select a soldier </p>

            <div class="buttons">
                <button class="btn btn-default" (click)="cancel()">CANCEL</button>
                <button class="btn btn-default" (click)="onOk()">OK</button>
            </div>
        </div>
    </div>
    `,
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
