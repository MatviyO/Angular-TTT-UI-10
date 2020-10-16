import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {merge, fromEvent, of} from 'rxjs';
import {GlobalState} from '../../../global.state';
import {TriggerService} from '../../../core/data';
import {AuthenticationService} from '../../../core/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss'],

})

export class BaPageTopComponent implements OnInit {

  isScrolled = false;
  isMenuCollapsed = false;
  isConnected: Observable<boolean>;


  constructor(
    private state: GlobalState,
    private router: Router,
    private authenticationService: AuthenticationService,
    private dataTrg: TriggerService,
  ) {
    this.state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.isConnected = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false)));
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  // tslint:disable-next-line:typedef
  scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  logOut(): void {
    this.authenticationService.logout()
      .then(res => {
        this.dataTrg.invalidate();
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.router.navigate(['/login']);
      });
  }
  clickTheme(): any {
    const el = document.getElementsByTagName('main')[0];
    el.classList.add('mybgstyle');
  }
}
