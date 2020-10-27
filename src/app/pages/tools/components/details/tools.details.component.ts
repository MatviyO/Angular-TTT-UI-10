import { Component, Input, Inject, ViewChild } from '@angular/core';


import { ToolsDetailsConfig } from './tools.details.config';
import {NavigationHelper} from '../../../../common/utils';
import {Tools, Trigger} from '../../../../core/model';
import {IEditorWithTriggersConfig, INavigationHelper} from '../../../../common/interfaces';
import {DetailsWithTriggersDirective} from '../../../../common/base-classes';
import { FileUploaderComponent } from 'src/app/common/components/upload-file/upload-file.component';


@Component({
    selector: 'app-tools-details',
    templateUrl: './tools.details.component.html',
    styleUrls: ['tools.details.component.scss'],
    providers: [ToolsDetailsConfig],
})

export class ToolsDetailsComponent extends DetailsWithTriggersDirective<Tools> {
    @ViewChild(FileUploaderComponent) FileUploaderComponent: FileUploaderComponent;
    files: any = [];
    dates = new Date();
    profileId: number;
    toolsForbidden = false;
    triggers: Trigger[];


    constructor(
        @Inject(ToolsDetailsConfig) config: IEditorWithTriggersConfig<Tools>,
        @Inject(NavigationHelper) protected navigation: INavigationHelper,
    ) {
        super(config);
        super.onDataLoaded((x) => this.dataLoaded(x));
        super.onTriggerLoaded((x) => this.hasTrigger(x));
    }


    dataLoaded(data): any {
        if (!data) {
            this.entity = new Tools();
            this.entity.applicationId = +this.queryParams['id'];

            this.navigation.addNavigation(`${this.queryParams['name']}`, `/profile/details/${this.queryParams['id']}`);
        } else {
            if (data.application) {
                this.navigation.addNavigation(`${data.application.firstName} ${data.application.lastName}`, `/profile/details/${this.entity.applicationId}`);
            }
            // this.fileUploader.getFiles(data.id);
        }
    }


    hasTrigger(triggers: Trigger[]): void {
        if (triggers) {
            if (triggers.find(x => x.mainObjectId === this.entity.id && x.objectId === null)) {
                this.entity.hasTrigger = true;
            }
        }
    }

    deactivateTriggers(): void {
        if (this.entity.processTerminated) {
            this.entity.processTerminated = null;
        } else {
            this.entity.processTerminated = this.formatedDate(new Date()) as Date;
            this.entity.toolsNeeded = false;
        }
    }

    formatedDate(inDate: Date): string | Date {
        if (inDate) {
            inDate = new Date(inDate);
            return `${inDate.getMonth() + 1}/${inDate.getDate()}/${inDate.getFullYear()}`;
        } else {
            return new Date();
        }
    }

    onSave(form): void {
        event.returnValue = false;
        if (form.valid) {
            super.save();
        } else {
            form._submitted = true;
            this.notificationSvc.warning('info', 'Please fill in required fields');
        }
    }
}
