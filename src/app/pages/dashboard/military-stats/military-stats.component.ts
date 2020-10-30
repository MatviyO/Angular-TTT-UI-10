import {Component, OnInit, Inject} from '@angular/core';
import {MilitaryBranchStatsService} from '../../../core/data';
import {ProfileStats} from '../../../core/model/properties/profile-stats';


@Component({
  selector: 'app-military-stats',
  templateUrl: 'military-stats.component.html',
  styleUrls: ['military-stats.component.scss'],
  providers: [MilitaryBranchStatsService],
})
export class MilitaryStatsComponent implements OnInit {
  stats = new ProfileStats();

  constructor(
    @Inject(MilitaryBranchStatsService) private militaryStatsSvc: MilitaryBranchStatsService,
  ) {
  }

  ngOnInit(): void {
    this.fetchStats();
  }

  fetchStats(): any {
    this.militaryStatsSvc.getStats()
      .then(res => this.stats = res);
  }
}
