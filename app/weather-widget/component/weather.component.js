"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var weather_service_1 = require('../service/weather.service');
var WeatherComponent = (function () {
    function WeatherComponent(service) {
        this.service = service;
        // this.service.getCurrentLocation();
        //this.pos = this.service.getCurrentLocation();  ---"this method returns an error" therefore do the below one---
        this.pos = [0, 0]; // prove that this methd works. Then replace as below
        this.service.getCurrentLocation();
        // this.service.getCurrentWeather(0, 0)  // -- Replace code as below
        // this.service.getCurrentWeather(this.pos[0], this.pos[1])  //--- Replace code as below
        this.service.getCurrentWeather(0, 0)
            .subscribe(function (weather) { return console.log(weather); }, // this is an observable
        function (// this is an observable
            err) { return console.error(err); }); // "shift + alt" to indent lines of code
        // --- Do not do this ---
        //    service: WeatherService;  
        //    constructor() {
        //      this.service = new WeatherService();
        //    }
    }
    WeatherComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'weather-widget',
            templateUrl: 'weather.component.html',
            styleUrls: ['weather.component.css'],
            providers: [weather_service_1.WeatherService]
        }), 
        __metadata('design:paramtypes', [weather_service_1.WeatherService])
    ], WeatherComponent);
    return WeatherComponent;
}());
exports.WeatherComponent = WeatherComponent;
//# sourceMappingURL=weather.component.js.map