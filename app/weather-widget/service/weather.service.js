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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var constants_1 = require('../constants/constants');
var WeatherService = (function () {
    //constructor(private jsonp: Jsonp) { }   // --- adding a constructor 2017/03/31 constructor(private jsonp: Jsonp) { }   // --- adding a constructor 2017/03/31 ------
    function WeatherService(jsonp, http) {
        this.jsonp = jsonp;
        this.http = http;
    } // --- adding Http 2017/04/04 constructor(private jsonp: Jsonp, private http: Http) { }   // --- adding a constructor 2017/03/31 ------
    //getCurrentLocation(): [number,number] {  // --- Replace as below
    WeatherService.prototype.getCurrentLocation = function () {
        if (navigator.geolocation) {
            return Observable_1.Observable.create(function (observer) {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    observer.next(pos);
                }),
                    //navigator.geolocation.getCurrentPosition(pos => {
                    //    console.log("Position: ", pos.coords.latitude, ",", pos.coords.longitude); // TODO: REMOVE
                    //    return [pos.coords.latitude,pos.coords.longitude];
                    //},            
                    //err => console.error("Unable to get the position - ", err));
                    //navigator.geolocation.getCurrentPosition(pos => {
                    //    console.log("Position: ", pos.coords.latitude, ",", pos.coords.longitude); // TODO: REMOVE
                    //    return [pos.coords.latitude,pos.coords.longitude];
                    //},            
                    //err => console.error("Unable to get the position - ", err));
                    function (//--- added after adding the Observable at Code line 25 
                        err) {
                        return Observable_1.Observable.throw(err);
                    };
            });
        }
        else {
            //console.error("Geolacation is not available"); // --- Replace code as below
            //return [0,0]  // --- Replace code as below
            return Observable_1.Observable.throw("Geolacation is not available");
        }
    };
    // --- creating a new method ---
    WeatherService.prototype.getCurrentWeather = function (lat, long) {
        var url = constants_1.FORECAST_ROOT + constants_1.FORECAST_KEY + "/" + lat + "," + long;
        var queryParams = "?callback=JSONP_CALLBACK";
        return this.jsonp.get(url + queryParams)
            .map(function (data) { return data.json(); })
            .catch(function (err) {
            console.error("Unable to get weather data - ", err);
            return Observable_1.Observable.throw(err.json());
        });
    };
    // Adding a Method
    WeatherService.prototype.getLocationName = function (lat, long) {
        var url = constants_1.GOOGLE_ROOT;
        var queryParams = "?latlng=" + lat + "," + long + "&key" + constants_1.GOOGLE_KEY;
        return this.http.get(url + queryParams)
            .map(function (loc) { return loc.json(); })
            .catch(function (err) {
            console.error("Unable to get location - ", err);
            return Observable_1.Observable.throw(err);
        });
    };
    WeatherService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp, http_1.Http])
    ], WeatherService);
    return WeatherService;
}());
exports.WeatherService = WeatherService;
//# sourceMappingURL=weather.service.js.map