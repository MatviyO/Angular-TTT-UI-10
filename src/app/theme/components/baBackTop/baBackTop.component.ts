import {Component, ViewChild, HostListener, Input, ElementRef, OnInit, AfterViewInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-ba-back-top',
  styleUrls: ['./baBackTop.scss'],
  template: `
    <i #baBackTop class="fa fa-angle-up back-top ba-back-top" title="Back to Top"></i>
  `
})
// tslint:disable-next-line:component-class-suffix
export class BaBackTopComponent implements OnInit, AfterViewInit {

  @Input() position = 400;
  @Input() showSpeed = 500;
  @Input() moveSpeed = 1000;

  // tslint:disable-next-line:variable-name
  @ViewChild('baBackTop') _selector: ElementRef;

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this._onWindowScroll();
  }

  @HostListener('click')
  _onClick(): boolean {
    jQuery('html, body').animate({scrollTop: 0}, {duration: this.moveSpeed});
    return false;
  }

  @HostListener('window:scroll')
  _onWindowScroll(): void {
    const el = this._selector.nativeElement;
    window.scrollY > this.position ? jQuery(el).fadeIn(this.showSpeed) : jQuery(el).fadeOut(this.showSpeed);
  }
}
