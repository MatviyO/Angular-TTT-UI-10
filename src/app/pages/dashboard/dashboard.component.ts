import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
