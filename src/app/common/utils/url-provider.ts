import { Injectable } from '@angular/core';
import { IUrlProvider } from '../interfaces';

@Injectable()
export class UrlProvider implements IUrlProvider {

    query(baseUrl: string, filter: string, order: string, take: number, skip: number, args: any[], defaultFilter: string = null, includes: string = null, selectJSONPath: string = null, withTotal: boolean = false): string {
        let url = `${baseUrl}?`;

        if (withTotal) {
            url += `total=true&`;
        }

        filter = this.combineFilters(filter, defaultFilter);

        if (filter) {
            url += `&where=${filter}`;
        }
        if (order) {
            url += `&order=${order}`;
        }
        if (!isNaN(take) && take > 0) {
            url += `&take=${take}`;
        }
        if (!isNaN(skip) && skip > 0) {
            url += `&skip=${skip}`;
        }
        if (args) {
            let aStr = '';
            args.forEach((x: any, i: number) => {
                aStr += `&${x['key']}=${x['value']}`;
            });
            url += aStr;
        }
        if (selectJSONPath) {
            url += `&select=${this.selectJSONPathWithParent(selectJSONPath)}`;
        }
        if (includes) {
            url += `&includes=${includes}`;
        }
        return url;
    }

    selectJSONPathWithParent(selectJSONPath: string): string {
        let _str = '';
        const parseStr = selectJSONPath.split(';;');
        if (parseStr) {
            if (parseStr.length > 1) {
                parseStr[1].split(';').map(x => _str += `${parseStr[0]}${x};`);
            } else {
                parseStr[0].split(';').map(x => _str += `${x};`);
            }
        }
        return _str;
    }

    count(baseUrl: string, filter: string, defaultFilter: string = null): string {
        return `${baseUrl}/count?where=${this.combineFilters(filter, defaultFilter)}`;
    }

    select(baseUrl: string, id: number, includes: string = null): string {
        if (includes) {
            return `${baseUrl}/${id}?&includes=${includes}`;
        }
        return `${baseUrl}/${id}`;
    }

    selectByPrefix(baseUrl: string, id: number, prefix: string, defaultFilter: string = null): string {
        let url = null;

        switch (prefix) {
            case 'appl':
                url = `${baseUrl}/?where=(applicationid==${id})`;
                break;
            case 'empl':
                url = `${baseUrl}/?where=(employmentCompanyId==${id})`;
                break;
            default:
                url = `${baseUrl}/?where=(id==${id})`;
                break;
        }
        if (defaultFilter) {
            url += ` and ${defaultFilter}`;
        }
        return url;
    }

    create(baseUrl: string): string {
        return baseUrl;
    }

    update(baseUrl: string, id: number, rowVersion: string): string {
        return `${baseUrl}/${id}?rv=${encodeURIComponent(rowVersion)}`;
    }

    delete(baseUrl: string, id: number): string {
        return `${baseUrl}/${id}`;
    }

    private combineFilters(filter: string, defaultFilter: string): string {
        if (defaultFilter) {
            filter = filter ? `(${filter}) and (${defaultFilter})` : defaultFilter;
        }
        return filter;
    }

}
