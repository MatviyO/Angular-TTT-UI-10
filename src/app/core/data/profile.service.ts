import { Injectable, Injector } from '@angular/core';

import { Profile } from '../model';
import {BaseDataService} from '../../common/services';

@Injectable()
export class ProfileService extends BaseDataService<Profile> {

    constructor(injector: Injector) {
        super(injector, 'api/Applications', `type=="3"`);
    }

    select(id: number): Promise<Profile> {
        // const url = `${this.urlProvider.select(this.url, id)}?apt=CanOrderTools&apt=CanHillerHousingAllowance&apt=HillerEmploymentId`;
        const url = `${this.urlProvider.select(this.url, id)}`;
        return this.http.get<Profile>(url)
            .toPromise()
            .catch(this.handleError);
    }

    create(obj: Profile): Promise<Profile> {
        obj.type = 3;
        return super.create(obj);
    }
}
