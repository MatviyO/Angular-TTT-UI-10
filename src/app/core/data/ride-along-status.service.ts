export class Status {
  id: number;
  name: string;
}

export class RideAlongStatusService {
  getStatuses(): Status[] {
    return [
      { id: 0, name: 'Requested' },
      { id: 1, name: 'Approved' },
      { id: 2, name: 'Confirmed' },
      { id: 3, name: 'Completed' },
      { id: 4, name: 'User Canceled' },
      { id: 5, name: 'Admin Canceled' },
    ];
  }

  getStatusById(id: number): string {
    const status = this.getStatuses().find(x => x.id === id);
    return status ? status.name : 'new';
  }

}
