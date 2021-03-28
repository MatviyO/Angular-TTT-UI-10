import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-ba-card',
  templateUrl: './baCard.html',
})
// tslint:disable-next-line:component-class-suffix
export class BaCardComponent {
  @Input() cardTitle: string;
  @Input() baCardClass: string;
  @Input() cardType: string;
}

