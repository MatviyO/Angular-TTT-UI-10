import { Injectable, Injector } from '@angular/core';
import {BaseDataService} from '../../common/services';

@Injectable()
export class TTTReportService extends BaseDataService<any> {

    constructor(protected injector: Injector) {
        super(injector, '');
    }

    getReport(filter: string = ''): any {
        // const url = `${this.url}/?${filter ? `where=${filter}&` : ''}export=report`;
        const newUrl = 'api/Reports/sc/MilitaryClassAvailability?export=report.xslx';

        return this.http.get(newUrl, { responseType: 'arraybuffer' })
            .subscribe(response => {
                const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute('download', 'file.xlsx');
                document.body.appendChild(link);
                link.download = `report ${new Date().toDateString()}.xlsx`;
                link.click();
                document.body.removeChild(link);
            });
    }
}
