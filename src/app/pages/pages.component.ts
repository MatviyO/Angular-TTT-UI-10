import { Component, OnInit } from '@angular/core';
import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],

})
export class PagesComponent implements OnInit {
  constructor(private menuService: BaMenuService) {
  }
  ngOnInit(): void {
    this.menuService.updateMenuByRoutes(PAGES_MENU);
  }
}
