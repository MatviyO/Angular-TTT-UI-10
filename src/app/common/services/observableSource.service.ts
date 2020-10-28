import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable()
export class ObservableService {

    constructor(private http: HttpClient) { }

    replaceSpecialCharacters(attribute: string): string {
      attribute = attribute.replace(/'/g, "''");
      attribute = attribute.replace(/"/g, '');
      attribute = attribute.replace(/%/g, '%25');
      attribute = attribute.replace(/\+/g, '%2B');
      attribute = attribute.replace(/\//g, '%2F');
      attribute = attribute.replace(/\?/g, '%3F');
      attribute = attribute.replace(/#/g, '%23');
      attribute = attribute.replace(/&/g, '%26');
      return attribute;
   }

  observableSourceProfile = (keyword: any = null): Observable<any[]> => {
    let filterStr = '';
    const words = keyword.split(' ');
    let fName = '';
    words.forEach((w: string) => {
      if (fName) { fName += ' and '; }
      fName += `(firstName.contains("${w}") or lastName.contains("${w}"))`;
    });
    filterStr += `(${fName}) and (type="3" and isActive=true)`;

    if (keyword) {
      return this.observableSourceAny(filterStr, '/api/Applications?where=');
    } else {
      return of([]);
    }
  }

  observableSourceVeteranProfile = (keyword: any = null): Observable<any[]> => {

    let filterStr = '';
    const words = keyword.split(' ');
    let fName = '';
    words.forEach((w: string) => {
      if (fName) { fName += ' and '; }
      fName += `(firstName.contains("${w}") or lastName.contains("${w}"))`;
    });
    filterStr += `(${fName}) and isActive=true and (type="3" or type="2" )`;

    if (keyword) {
      return this.observableSourceAny(filterStr, '/api/Applications?where=');
    } else {
      return of([]);
    }
  }

  observableSourceCompanies = (keyword: any): Observable<any[]> => {
    if (keyword) {
      return this.observableSourceAny(`(name.contains("${this.replaceSpecialCharacters(keyword)}"))`, '/api/Companies?includes=Trades,Contacts,AlternateLocations&where=isProspect=false and isActive=true  and');
    } else {
      return of([]);
    }
  }

  observableSourceTypeProfile = ( forType: string, filter: string, keyword: any): Observable<any[]> => {
    let apt = '';
    if (forType === 'hiller') {
      apt = '&apt=CanHillerHousingAllowance&apt=HillerEmploymentId';
    }
    let filterStr = '';
    const words = keyword.split(' ');
    let fName = '';
    words.forEach((w: string) => {
      if (fName) { fName += ' and '; }
      fName += `(firstName.contains("${w}") or lastName.contains("${w}"))`;
    });
    filterStr += `(${fName}) and (isActive=true) ${filter ? `and(${filter})` : 'and(type="3")'}`;
    if (keyword) {
      return this.observableSourceAny(filterStr, '/api/Applications?where=', apt, forType);
    } else {
      return of([]);
    }
  }

  observableSourceAny = (keyword: any, url: string, _apt?: string, _forType?: string): Observable<any[]> => {
    let newUrl = url + keyword;
    if (keyword) {
      if (_apt && _forType) {
        newUrl = newUrl + _apt;
        const a = [];
        return this.http.get<any[]>(newUrl)
          .pipe(map(res => {
            res.forEach(item => {
              if (_forType === 'hiller') {
                if (item.properties && item.properties.CanHillerHousingAllowance) {
                  a.push(item);
                }
              }
              if (_forType === 'tools') {
                a.push(item);
              }
            });
            return a;
          }));
      } else {
        return this.http.get<any[]>(newUrl);
      }
    } else {
      return of([]);
    }
  }
}

