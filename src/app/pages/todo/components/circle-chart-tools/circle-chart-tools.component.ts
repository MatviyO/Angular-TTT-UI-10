import {Component, OnInit} from '@angular/core';
import {ToolsService} from '../../../../core/data';


@Component({
  selector: 'app-circle-chart-tools',
  templateUrl: './circle-chart-tools.component.html',
  styleUrls: ['./circle-chart-tools.component.scss', '../../todo-dashboard.component.scss'],
})
export class CircleChartToolsComponent implements OnInit {

  showLoadData = false;
  chart: any = {};
  doughnutData: any[] = new Array();

  constructor(private dataSvc: ToolsService) {
  }
  ngOnInit(): void {

    this.chart.tools = [];
    this.dataSvc.query('', '', 100, 0)
      .then(response => {
        this.chart.tools = response;
      });
  }
}
