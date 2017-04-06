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
//import { Component } from '@angular/core';
var core_1 = require('@angular/core');
var weather_service_1 = require('../service/weather.service');
var weather_1 = require('../model/weather');
var constants_1 = require('../constants/constants'); // --- Added on 2017-04-05 ---
var WeatherComponent = (function () {
    function WeatherComponent(service) {
        this.service = service;
        this.weatherData = new weather_1.Weather(null, null, null, null, null); // After creating a model folder and weather.ts, then creatiing a new instans with no values
        this.currentSpeedUnit = "kph";
        this.currentTempUnit = "fahrenheit";
        this.currentLocation = "";
        //icons = new Skycons({ "color": "#FFF" }); // --- Added on 2017-04-04 ---
        this.icons = new Skycons(); // --- Added on 2017-04-05 ---
        this.dataReceived = false; // --- Adding new component property on 2017-04-05 (1)---
        this.service.getCurrentLocation();
        //this.pos = this.service.getCurrentLocation();  ---"this method returns an error" therefore do the below one---
        //this.pos = [0,0];  // prove that this methd works. Then replace as below
        //this.service.getCurrentLocation()
        //    .subscribe(position => {
        //        this.pos = position
        //        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
        //            .subscribe(weather => console.log(weather),
        //            err => console.error(err));
        //    },
        //}
        // this.service.getCurrentWeather(0, 0)  // -- Replace code as below
        // this.service.getCurrentWeather(this.pos[0], this.pos[1])  //--- Replace code as below
        //this.service.getCurrentWeather(0, 0)
        //    .subscribe(weather => console.log(weather),   // this is an observable
        //    err => console.error(err)); // "shift + alt f" to indent lines of code
        // --- Do not do this ---
        //    service: WeatherService;  
        //    constructor() {
        //      this.service = new WeatherService();
    }
    WeatherComponent.prototype.ngOnInit = function () {
        this.getCurrentLocation();
    };
    WeatherComponent.prototype.getCurrentLocation = function () {
        var _this = this;
        this.service.getCurrentLocation()
            .subscribe(function (position) {
            _this.pos = position;
            _this.getCurrentWeather();
            _this.getLocationName();
        }, function (err) { return console.error(err); });
    };
    WeatherComponent.prototype.getCurrentWeather = function () {
        var _this = this;
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(function (weather) {
            _this.weatherData.temp = weather["currently"]["temperature"];
            _this.weatherData.summary = weather["currently"]["summary"];
            _this.weatherData.wind = weather["currently"]["windSpeed"];
            _this.weatherData.humidity = weather["currently"]["humidity"];
            _this.weatherData.icon = ["currently"]["icon"];
            console.log("Weather ", _this.weatherData); // TODO: REMOVE
            _this.setIcon(); // --- Added on 2017-04-04 ---
            _this.dataReceived = true; // --- Added on 2017-04-05 (1a)---
        }, function (err) { return console.error(err); });
    };
    //-- creating a method
    WeatherComponent.prototype.getLocationName = function () {
        var _this = this;
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(function (location) {
            console.log(location); // TODO: REMOVE
            _this.currentLocation = location["results"][4]["formatted_address"]; // adding current location 2017-04-04
            console.log("Name: ", _this.currentLocation); // TODO: REMOVE 
        });
    };
    WeatherComponent.prototype.toggleUnits = function () {
        this.toggleTempUnits();
        this.toggleSpeedUnits();
    };
    WeatherComponent.prototype.toggleTempUnits = function () {
        if (this.currentTempUnit == "fahrenheit") {
            this.currentTempUnit = "celsius";
        }
        else {
            this.currentTempUnit = "fahrenheit";
        }
    };
    WeatherComponent.prototype.toggleSpeedUnits = function () {
        if (this.currentSpeedUnit == "kph") {
            this.currentSpeedUnit = "mph";
        }
        else {
            this.currentSpeedUnit = "kph";
        }
    };
    // --- Added on 2017-04-04 ---
    WeatherComponent.prototype.setIcon = function () {
        this.icons.add("icon", this.weatherData.icon);
        this.icons.play(); // --- starts playing the animation
    };
    // --- Creating a method. Added on 2017-04-05 after adding the values of WEATHER_COLORS in the constants.ts file ---
    WeatherComponent.prototype.setStyles = function () {
        if (this.weatherData.icon) {
            this.icons.color = constants_1.WEATHER_COLORS[this.weatherData.icon]["color"]; // --- added after ---
            //return WEATHER_COLORS [this.weatherData.icon];
            return constants_1.WEATHER_COLORS["fog"]; // --- just to test icon color 2017-04-05 --- 
        }
        else {
            this.icons.color = constants_1.WEATHER_COLORS["default"]["color"]; // --- added after ---
            return constants_1.WEATHER_COLORS["default"];
        }
    };
    WeatherComponent = __decorate([
        // --- Added on 2017-04-04 ---
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