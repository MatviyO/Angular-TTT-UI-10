import {InMemoryDbService, ResponseOptions} from 'angular-in-memory-web-api';


export class InMemoryDataService implements InMemoryDbService {
  // tslint:disable-next-line:typedef
  createDb() {
    const BaseName = [
      {
        id: 1,
        rowVersion: 'asdfasdf111',
        applicationId: 2,
        attendingDraduation: true,
        notes: 'asdfsf222',
        graduationLocation: 'asdfsf33',

        classes: [
          {
            level: 'level2',
            trade: 'Electrical',
            notes: 'sdfsdf',
          },
        ],
      },
      {
        id: 2,
        rowVersion: 'oirtjgf',
        applicationId: 3,
        attendingDraduation: true,
        notes: 'asdfsf3',
        graduationLocation: 'asdfsf3',

        classes: [
          { level: 'level-3' },
        ],
      },
      {
        id: 3,
        rowVersion: 'asdfasdf4',
        applicationId: 4,
        attendingDraduation: true,
        notes: 'asdfsf4',
        graduationLocation: 'asdfsf4',

        classes: [
        ],
      },
    ];
    return { BaseName };
  }

  // tslint:disable-next-line:typedef
  responseInterceptor(res: ResponseOptions, ri: RequestInfo) {

    if (ri['collectionName'] === 'classes') {
      if (ri['id'] === 'appl') {
        let r = ri['req']['url'].split('/');
        ri['id'] = r[r.length - 1];
        let result = [];
        let data = ri['collection'] as any[];
        data.forEach(item => {
          if (item['applicationId'] == ri['id']) {
            result.push(item);
          }
        });
        res.body = result;
        res.status = 200;
      } else {
        res.body = { data: ri['collection'], total: ri['collection'].length };
      }
    }
    return res;
  }
}
