import { Injectable, InjectionToken, Injector, Provider, Type } from '@angular/core';


import { MilitaryBase, CompanyAffiliate } from '../model';
import {ResourceServiceBase} from '../../common/services';



class ServiceConfig {
    token: InjectionToken<any>;
    constructor(public url: string, public type: Type<any>) {
        this.token = new InjectionToken<any>(this.type.toString());
    }
}

const servicesDefinitions: ServiceConfig[] = [
    new ServiceConfig('api/MilitaryBases', MilitaryBase),
    new ServiceConfig('api/companyaffiliates', CompanyAffiliate),
];

class ProviderPool {

    constructor(private services: ServiceConfig[]) { }

    resourceServiceFactory(type: Type<any>): Provider {
        const config = this.services.find(x => x.type === type);

        if (!config) {
            return null;
        }

        return {
            provide: config.token,
            useFactory: (injector: Injector) => new ResourceServiceBase(injector, config.url),
        };
    }

    getProviders(definition: ServiceConfig[]): Provider[] {
        const res = new Array<Provider>();

        definition.forEach(item => {
            res.push(this.resourceServiceFactory(item.type));
        });

        return res;
    }
}

export function getProvider(type: Type<any>): InjectionToken<any> {
    return servicesDefinitions.find(x => x.type === type).token;
}

export let resourceServiceProvider = new ProviderPool(servicesDefinitions).getProviders(servicesDefinitions);
