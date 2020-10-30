import { Component, OnInit } from '@angular/core';

import * as Chart from 'chart.js';
import {ProfileService} from '../../../../core/data';

@Component({
  selector: 'app-circle-chart',
  templateUrl: './circle-chart.component.html',
  styleUrls: ['./circle-chart.component.scss', '../../todo-dashboard.component.scss'],
})
export class CircleChartComponent implements OnInit {
    showLoadData = true;
    chart: any = {};
  // tslint:disable-next-line:ban-types
    doughnutData: Object[];

    constructor(private dataSvc: ProfileService) {
    }

    ngOnInit(): void {

        this.chart.profiles = [];

        const _date1 = new Date();
        const _date2 = new Date();

        const yellow_date = _date1.setDate(_date1.getDate() - 13);
        const red_date = _date2.setDate(_date2.getDate() - 20);
        const date_yellow_full = new Date(new Date(yellow_date).getFullYear(), new Date(yellow_date)
          .getMonth(), new Date(yellow_date).getDate());
        const date_red_full = new Date(new Date(red_date).getFullYear(), new Date(red_date).getMonth(), new Date(red_date).getDate());

        this.dataSvc.query('', '', 10000, 0)
            .then(response => {
                this.chart.profiles = response;
                this.chart.complete = response.filter(x => x.registrationComplete);
                this.chart.noComplete = response.filter(x => !x.registrationComplete);
                this.chart.noComplete2week = response
                  .filter(x => !x.registrationComplete && new Date(x.applicationDate)
                    < new Date(date_yellow_full) && new Date(x.applicationDate) >= new Date(date_red_full));
                this.chart.noComplete3week = response
                  .filter(x => !x.registrationComplete && new Date(x.applicationDate) < new Date(date_red_full));

                this.doughnutData = [
                    {
                        value: this.chart.complete.length,
                        color: '#0093ff',
                        highlight: 'blue',
                        label: 'Completed',
                        percentage: (this.chart.complete.length / this.chart.profiles.length * 100).toFixed(2),
                        order: 1,
                        filter: 'complete',
                    }, {
                        value: this.chart.noComplete.length - (this.chart.noComplete2week.length + this.chart.noComplete3week.length),
                        color: 'white',
                        highlight: '#bfbfbf',
                        label: 'No completed under 2 weeks ',
                        percentage: ((this.chart.noComplete.length - (this.chart.noComplete2week.length + this.chart.noComplete3week.length)) / this.chart.profiles.length * 100).toFixed(2),
                        order: 3,
                        filter: 'incomplete',
                    }, {
                        value: this.chart.noComplete2week.length,
                        color: '#c5c168',
                        highlight: '#dcc408',
                        label: 'No completed between 2 and 3 weeks',
                        percentage: (this.chart.noComplete2week.length / this.chart.profiles.length * 100).toFixed(2),
                        order: 4,
                        filter: 'wrn',
                    }, {
                        value: this.chart.noComplete3week.length,
                        color: '#eca48d',
                        highlight: '#f37048',
                        label: 'No completed over 3 weeks',
                        percentage: (this.chart.noComplete3week.length / this.chart.profiles.length * 100).toFixed(2),
                        order: 5,
                        filter: 'alert',
                    },
                ];

                this._loadDoughnutCharts();
                this.showLoadData = false;
            });

    }

    private _loadDoughnutCharts(): any {
        const el = jQuery('.chart-area').get(0) as HTMLCanvasElement;
        new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
            segmentShowStroke: false,
            percentageInnerCutout: 64,
            responsive: true,
        });
    }

}
