import { Trade } from '../model/properties';

export class TradesService {

  getTrades(): Trade[] {
    return [
      { id: 1, name: 'Plumbing' },
      { id: 2, name: 'Electrical' },
      { id: 3, name: 'HVAC' },
      { id: 4, name: 'HVAC Install' },
    ];
  }

  getTradesById(id: number): string {
    const trade = this.getTrades().find(x => x.id === id);
    return trade ? trade.name : '';
  }
}
