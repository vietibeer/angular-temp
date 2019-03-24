import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';

@Component({
    selector: 'app-goole-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    @Input() position: string;
    title: string = 'My first AGM project';
    lat: number;
    lng: number;
    isPositionError = false;

    constructor(
        private mapService: MapService,
        private ref: ChangeDetectorRef
    ) { }

    ngOnInit() { }

    mapReadyHandler() {
        this.mapService.getGeocodeLocation(this.position).subscribe(coord => {
            this.lat = coord.lat;
            this.lng = coord.lng;
            this.ref.detectChanges();
        }, err => {
            this.isPositionError = true;
        })
    }
}
