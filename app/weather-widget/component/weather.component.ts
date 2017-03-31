import { Component } from '@angular/core';

import { WeatherService } from '../service/weather.service';

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: [ 'weather.compoent.css' ],
    providers: [ WeatherService ] 
})
export class WeatherComponent { 
    constructor(private service: WeatherService) {
           this.service.getCurrentLocation();                                                                                                          
// --- Do not do this ---
    //    service: WeatherService;  
    //    constructor() {
    //      this.service = new WeatherService();
    //    }
    }
}  