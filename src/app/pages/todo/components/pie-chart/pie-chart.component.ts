import { Component, OnInit } from '@angular/core';
import {StudentGraduationService} from '../../../../core/data';


@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],

})
export class PieChartComponent implements OnInit {

    showLoadData = true;
    pie: any = {};

    constructor(protected dataSvc: StudentGraduationService) {

    }

    ngOnInit(): void {
        const yellowDate = new Date();
        yellowDate.setDate(yellowDate.getDate() + 20);

        const redDate = new Date();
        redDate.setDate(redDate.getDate() + 10);

        this.dataSvc.query('', '', 10000, 0)
            .then(response => {
                this.pie.red = response
                    .filter(x => !x.graduationInvitationSentDate && new Date(x.graduationExpectedDate.date) < new Date(redDate)).length;

                this.pie.yellow = response
                    .filter(x => !x.graduationInvitationSentDate && new Date(x.graduationExpectedDate.date) < new Date(yellowDate)
                        && new Date(x.graduationExpectedDate.date) >= new Date(redDate)).length;
                this.showLoadData = false;
            });
    }

    onHttpError(error: any): void {
        this.showLoadData = false;
    }


}
