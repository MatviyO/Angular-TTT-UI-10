import { Component, Output, EventEmitter, Input, Inject, Injectable } from '@angular/core';
import { ClassesService } from '../../data';
import {SchedulingType} from '../../model';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'addNewSelectItem',
    template: `
    <div *ngIf="!hide" class="main">
        <div class="item">
            <p class="head-title"> Please select a class to add this user to reservations </p>

            <select class="form-control" name="classes" [(ngModel)]="selectedClassId">
                <option hidden [value]="null">select...</option>
                <option *ngFor="let class of classes" [ngClass]="{'yellow': isActualClass(class.endDate)}" [value]="class.id">
                    {{class? class.program.name: ""}} {{"("}}{{class.startDate | date:'MM/dd/yyyy'}} {{"-"}} {{class.endDate | date:'MM/dd/yyyy'}}{{")"}} {{class.priorClass || class.laterClass ? getSchedulingType(class.schedulingType) : ''}}
                </option>
              </select>

              <div class="item-radio">
                <label for="sort1" (click)="sorting(true)"> Sort by start date </label>
                <input name="sort" id="sort1" type="radio" class="form-control" checked (click)="sorting(true)">
              </div>
              <div class="item-radio">
                <label for="sort2" (click)="sorting(false)"> Sort by end date </label>
                <input name="sort" id="sort2" type="radio" class="form-control" (click)="sorting(false)">
              </div>

              <p [ngClass]="{'show': showErr && !selectedClassId}" class="error"> <i class="fa fa-info-circle" aria-hidden="true"></i> Please select a class </p>

            <div class="buttons">
                <button class="btn btn-default" (click)="cancel()">CANCEL</button>
                <button class="btn btn-default" (click)="onOk()">OK</button>
            </div>
        </div>
    </div>
    `,
    styleUrls: ['add-new-item.component.scss'],
    providers: [ClassesService],
})

export class AddNewSelectItemComponent {
    @Output() clickOk = new EventEmitter();
    @Output() dataLoaded = new EventEmitter();

    showErr: boolean = false;
    hide: boolean = true;
    selectedClassId: number = null;
    classes: any[] = [];
    nowDate: Date = new Date();

    constructor(@Inject(ClassesService) private classesSvc: ClassesService) { }

    show = (): void => {
        if (this.classes.length === 0) {
          // tslint:disable-next-line:max-line-length
            // query(filter: string = '', order: string = '', take: number = 20, skip: number = 0, args: any[] = [], includes: string = null):
            this.classesSvc.query(`isActive=true and startDate >= "${ new Date().toDateString() }"`, '', -1, 0, [], 'Days, Program, Participants')
                .then(res => {
                    this.classes = res;
                    // res.data.forEach(a=> a.isActive?this.classes.push(a):null);
                    this.sorting(true)
                        .then(() => {
                            this.hide = false;
                            this.dataLoaded.emit();
                        });
                })
                .catch(() => this.dataLoaded.emit());
        } else {
            this.sorting(true)
                .then(() => {
                    this.hide = false;
                    this.dataLoaded.emit();
                });
        }
    }

    onOk(): void {
        if (this.selectedClassId && this.selectedClassId >= 0) {
            const _class = this.classes.find(x => x.id === +this.selectedClassId);
            if (_class) {
                this.clickOk.emit(_class);
            }
        } else {
            this.showErr = true;
        }
    }

    getSchedulingType(type: SchedulingType): string {
        return SchedulingType[type];
      }

    cancel(): void {
        this.selectedClassId = null;
        this.hide = true;
        this.showErr = false;
    }

    sorting = (sortByStartDate: boolean): Promise<boolean> => {
        return new Promise((resolve) => {
            if (sortByStartDate) {
                this.classes = this.classes.sort((b: any, a: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
                resolve(true);
            } else {
                this.classes = this.classes.sort((b: any, a: any) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
                resolve(true);
            }
        });
    }

    isActualClass = (endDate: Date): boolean => {
        return (new Date(endDate) < this.nowDate);
    }

}
