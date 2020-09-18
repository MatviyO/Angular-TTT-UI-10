import { Component, Output, Input, EventEmitter } from '@angular/core';
import { LocationMapService } from '../../data';
import { MapLocation, EmploymentCompany } from '../../model';

@Component({
    selector: 'app-googleMap',
    templateUrl: 'googleMap.component.html',
    styleUrls: ['googleMap.component.scss'],
    providers: [LocationMapService],

})

export class GoogleMapComponent {
    @Output() onChanged = new EventEmitter();
    @Input() showMap: any;
    @Input() canSelectCompany: boolean;
    noFound: boolean = false;
    location: MapLocation[] = [];
    centerLat: number = 36.1626638;
    centerLon: number = -86.7816016;
    zoom: number = 12;
    _distance: number = 2;
    setZoom: boolean = false;
    applId: number;

    constructor( private locationMapSvc: LocationMapService ) {
    }

    setUniqueClosestCompany(companies: any[]): any[] {
        const _companies = [];
        const _clCompaniesId = [];
        const _clCompanies = [];

        companies.map((comp, i) => {
            if (i > 0) {
                comp.closestCompanies.map(clComp => {
                    const hasComp = _clCompaniesId.find(x => x === clComp.companyId);
                    if (!hasComp) {
                        _clCompanies.push(clComp);
                    }
                });
                comp.closestCompanies = _clCompanies;
                _companies.push(comp);
            } else {
                comp.closestCompanies.map(clComp => {
                    _clCompaniesId.push(clComp.companyId);
                });
                _companies.push(comp);
            }
        });
        return _companies;
    }

    onShowMap(applicationID?: number) {
        if (applicationID) { this.applId = applicationID; }

        this.locationMapSvc.query(this.applId, this._distance * 10)
            .then(res => {
                if (res.length > 0) {
                    this.location = this.setUniqueClosestCompany(res);

                    const latArray = [];
                    const lonArray = [];

                    for (const i of this.location) {
                        if (!isNaN(i.latitude)) { latArray.push(i.latitude); }
                        if (!isNaN(i.longitude)) { lonArray.push(i.longitude); }

                        for (const ii of i.closestCompanies) {
                            latArray.push(ii.latitude);
                            lonArray.push(ii.longitude);
                        }
                    }

                    this.centerLat = (Math.max(...latArray) + Math.min(...latArray)) / 2;
                    this.centerLon = (Math.max(...lonArray) + Math.min(...lonArray)) / 2;
                    if (latArray.length > 1) {
                        const lat = Math.max(...latArray) - Math.min(...latArray);
                        const lon = Math.max(...lonArray) - Math.min(...lonArray);
                        lat > lon ? this.setZoomMap(lat) : this.setZoomMap(lon);
                    }
                } else {
                    this.noFound = true;
                }
            });
    }

    setZoomMap(coordinate: number): void {
        if (coordinate > 0.2) { this.zoom = 11; }
        if (coordinate > 0.5) { this.zoom = 10; }
        if (coordinate > 0.6) { this.zoom = 9; }
        if (coordinate > 1) { this.zoom = 9; }
        if (coordinate > 2) { this.zoom = 8; }
        if (coordinate > 4) { this.zoom = 5; }

        const withDevice = document.body.clientWidth;
        if (withDevice < 1000 && !this.setZoom) {
            this.zoom += -1;
            if (withDevice < 700 && !this.setZoom) {
                this.zoom += -1;
            }
            this.setZoom = true;
        }
    }

    selectComp(item: EmploymentCompany, info: { close: () => void; }) {
        info.close();
        this.onChanged.emit(item);
    }
}
