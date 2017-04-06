//import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../service/weather.service';

import { Weather } from '../model/weather';

import { WEATHER_COLORS } from '../constants/constants'; // --- Added on 2017-04-05 ---

declare var Skycons: any;  // --- Added on 2017-04-04 ---

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})
//export class WeatherComponent {
export class WeatherComponent implements OnInit {
   // pos: [number,number];
    pos: Position;
    weatherData = new Weather(null, null, null, null, null);  // After creating a model folder and weather.ts, then creatiing a new instans with no values
    currentSpeedUnit = "kph"; 
    currentTempUnit = "fahrenheit";
    currentLocation = "";
    //icons = new Skycons({ "color": "#FFF" }); // --- Added on 2017-04-04 ---
    icons = new Skycons(); // --- Added on 2017-04-05 ---
    dataReceived = false;  // --- Adding new component property on 2017-04-05 (1)---
    
    
    constructor(private service: WeatherService) {
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
    
        ngOnInit() {
            this.getCurrentLocation();
        }

        getCurrentLocation() {
            this.service.getCurrentLocation()
            .subscribe(position => {
                this.pos = position;
                this.getCurrentWeather();
                this.getLocationName();
            },
            err => console.error(err));
        }

        getCurrentWeather() {
            this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
                //.subscribe(weather => console.log(weather),
                .subscribe(weather => {
                    this.weatherData.temp = weather["currently"]["temperature"]
                    this.weatherData.summary = weather["currently"]["summary"]
                    this.weatherData.wind = weather["currently"]["windSpeed"]
                    this.weatherData.humidity = weather["currently"]["humidity"]
                    this.weatherData.icon = ["currently"]["icon"]
                    console.log("Weather ", this.weatherData); // TODO: REMOVE
                    this.setIcon();  // --- Added on 2017-04-04 ---
                    this.dataReceived = true; // --- Added on 2017-04-05 (1a)---
                },
                err => console.error(err));
        }

        //-- creating a method
        getLocationName () {
            this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
                .subscribe(location => {
                    console.log(location) // TODO: REMOVE
                    this.currentLocation = location["results"][4]["formatted_address"]   // adding current location 2017-04-04
                    console.log("Name: ", this.currentLocation);  // TODO: REMOVE 
                });
    }

    toggleUnits() {
        this.toggleTempUnits();
        this.toggleSpeedUnits();
    }

    toggleTempUnits(){
        if(this.currentTempUnit == "fahrenheit") {
            this.currentTempUnit = "celsius"
        } else {
            this.currentTempUnit = "fahrenheit";
        }
    }

    toggleSpeedUnits(){
        if (this.currentSpeedUnit ==  "kph") {
            this.currentSpeedUnit = "mph";
        } else {
            this.currentSpeedUnit = "kph";
        }
    }

    // --- Added on 2017-04-04 ---
    setIcon() {
        this.icons.add("icon", this.weatherData.icon);
        this.icons.play(); // --- starts playing the animation
    }

    // --- Creating a method. Added on 2017-04-05 after adding the values of WEATHER_COLORS in the constants.ts file ---
    setStyles(): Object {        
        if(this.weatherData.icon){
            this.icons.color = WEATHER_COLORS[this.weatherData.icon]["color"]; // --- added after ---
            //return WEATHER_COLORS [this.weatherData.icon];
            return WEATHER_COLORS ["fog"]; // --- just to test icon color 2017-04-05 --- 
        }else {
            this.icons.color = WEATHER_COLORS["default"]["color"]; // --- added after ---
            return WEATHER_COLORS ["default"];
        }
    }
}