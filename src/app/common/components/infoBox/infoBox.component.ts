import { Component, OnInit, Inject } from '@angular/core';

import { INotificationService, Severity } from '../../interfaces';
import { NotificationService } from '../../services';

@Component({
    selector: 'app-info-box',
    templateUrl: 'infoBox.component.html',
    styleUrls: ['infoBox.component.scss'],
})

export class InfoBoxComponentComponent implements OnInit {

    notification: any = [];
    num = 0;
    time = 30000;

    constructor(
        @Inject(NotificationService) private notificationSvc: INotificationService,
    ) { }

    ngOnInit(): void {
        this.notificationSvc.subscribe((p, t, m) => this.present(p, t, m));
    }

    present(severity: Severity, title: string, message: string): void {
        this.showMessage(severity, title, message);
    }

  // tslint:disable-next-line:typedef
    showMessage(severity: Severity, title: string, message: string) {
        this.num += 1;
        const notification = {
            severity,
            title,
            message,
            visible: true,
            num: this.num,
        };
        this.notification.push(notification);

        this.time = severity === Severity.warning ? 5000 : 30000;

        setTimeout(() => {
            this.close(notification.num);
        }, this.time);
    }

  // tslint:disable-next-line:typedef
    close(num) {
        const item = this.notification.findIndex(x => x.num === num);
        this.notification.splice(item, 1);
    }

    getSeverity(id: number): string {
        return Severity[id].toString();
    }
}
