import { Component } from '@angular/core';

import { WeatherService } from '../service/weather.service';

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})
export class WeatherComponent {
    pos: [number, number];


    constructor(private service: WeatherService) {
        // this.service.getCurrentLocation();
        //this.pos = this.service.getCurrentLocation();  ---"this method returns an error" therefore do the below one---
        //this.pos = [0,0];  // prove that this methd works. Then replace as below
        this.service.getCurrentLocation()
            .subscribe(position => {
                this.pos = position
                this.service.getCurrentWeather(this.pos.coords.latitud, this.pos.coords.longitud)
                    .subscribe(weather => console.log(weather),
                    err => console.error(err));
            },

        // this.service.getCurrentWeather(0, 0)  // -- Replace code as below
        // this.service.getCurrentWeather(this.pos[0], this.pos[1])  //--- Replace code as below
        //this.service.getCurrentWeather(0, 0)
        //    .subscribe(weather => console.log(weather),   // this is an observable
            
            err => console.error(err)); // "shift + alt f" to indent lines of code

        // --- Do not do this ---
        //    service: WeatherService;  
        //    constructor() {
        //      this.service = new WeatherService();
        //    }
    }
}  