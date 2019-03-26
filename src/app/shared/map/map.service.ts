import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CamelizePipe } from "ngx-pipes";

@Injectable()
export class MapService {

    private geocoder;
    private locationCache: any = {};

    constructor(
        private cameLizePipe: CamelizePipe
    ) { }

    private cameLize(value: string): string {
        return this.cameLizePipe.transform(value);
    }

    private isCacheLocation(location): boolean {
        return this.locationCache[this.cameLize(location)];
    }

    private cacheLocation(location: string, coord: any) {
        this.locationCache[this.cameLize(location)] = coord;
    }

    private geocodeLocation(location: string): Observable<any> {

        if (!this.geocoder) this.geocoder = new (<any>window).google.maps.Geocoder();

        return new Observable(obs => {
            

            this.geocoder.geocode({ address: location }, (results, status) => {
                if (status == 'OK') {

                    const geometry = results[0].geometry.location;
                    const coord = {
                        lat: geometry.lat(),
                        lng: geometry.lng()
                    };
                    this.cacheLocation(location, coord);
                    obs.next(coord);

                } else {
                    obs.error('Geocode was not successful for the following reason: ' + status);
                }
            });
            
        });
    }

    getGeocodeLocation(location: string): Observable<any> {
        if (this.isCacheLocation(location)) {
            return of(this.locationCache[this.cameLize(location)]);
        } else {
           return this.geocodeLocation(location);
        }
        
    }
}