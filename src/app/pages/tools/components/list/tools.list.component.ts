import { Component, Inject, ViewChild } from '@angular/core';
import { ToolsListConfig } from './tools.list.config';
import { HttpClient } from '@angular/common/http';
import {IListWithTriggersConfig} from '../../../../common/interfaces';
import {Tools} from '../../../../core/model';
import {BaseSortableListWithTriggersDirective} from '../../../../common/base-classes';
import {AddNewItemComponent} from '../../../../common/components/add-new-item/add-new-item.component';

@Component({
    selector: 'app-tools-list',
    templateUrl: './tools.list.component.html',
    styleUrls: ['tools.list.component.scss'],
    providers: [ToolsListConfig],
})

export class ToolsListComponent extends BaseSortableListWithTriggersDirective<Tools> {
    @ViewChild(AddNewItemComponent) addNewItem: AddNewItemComponent;
    // @ViewChild(FileUploader) _fileUploader: FileUploader;
    phone: any;
    filterNewItem = `type="3" or type="2"`;

    constructor(
        @Inject(ToolsListConfig) config: IListWithTriggersConfig<Tools>,
        private http: HttpClient,
    ) {
        super(config);
    }

    showWindow = () => { this.addNewItem.show(); };

    getFilterFormatted(): string {
        let filterStr = '';
        if (this.filter.name) {
            const words = this.filter.name.split(' ');
            let fName = '';
            words.forEach((w: string) => {
                if (w) {
                    if (fName) { fName += ' and '; }
                    fName += `(application.firstName.contains("${w}") or application.lastName.contains("${w}"))`;
                }
            });
            filterStr += `(${fName})`;
        }
        if (this.filter.poNumber) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `poNumber.contains("${this.filter.poNumber}")`;
        }
        if (this.filter.invoiceNumber) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `invoiceNumber.contains("${this.filter.invoiceNumber}")`;
        }
        if (this.filter.checkNumber) {
            if (filterStr) { filterStr += ' and '; }
            filterStr += `checkNumber.contains("${this.filter.checkNumber}")`;
        }
        if (this.filter.status) {
            if (this.filter.status !== 'undefined') {
                if (filterStr) { filterStr += ' and '; }
                if (this.filter.status === 'New') {
                    filterStr += 'LastDateSet == null';
                } else {
                    if (this.filter.status === 'ProcessTerminated') {

                        filterStr += `processTerminated != null`;
                    } else {
                        filterStr += `lastDateSet.contains("${this.filter.status}")`;
                    }
                }
            }
        }
        return filterStr;
    }

    addSpace(str: string): string {
        if (!str) {
            return 'New';
        }
        if (str === 'POReceived') {
            return 'PO received';
        }
        let _str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
        const index = _str.indexOf(' ');
        _str = `${_str.substr(0, index)}  ${_str.charAt(index + 1).toLowerCase()}${_str.substr(index + 2)}`;

        return _str;
    }
}
