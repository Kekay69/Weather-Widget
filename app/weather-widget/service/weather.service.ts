import { Injectable } from '@angular/core';
import { Jsonp, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { FORECAST_KEY, FORECAST_ROOT, GOOGLE_KEY, GOOGLE_ROOT } from '../constants/constants';

@Injectable()
export class WeatherService {

    //constructor(private jsonp: Jsonp) { }   // --- adding a constructor 2017/03/31 constructor(private jsonp: Jsonp) { }   // --- adding a constructor 2017/03/31 ------
    constructor(private jsonp: Jsonp, private http: Http) { }   // --- adding Http 2017/04/04 constructor(private jsonp: Jsonp, private http: Http) { }   // --- adding a constructor 2017/03/31 ------

    //getCurrentLocation(): [number,number] {  // --- Replace as below
    getCurrentLocation(): Observable<any> {
        if (navigator.geolocation) {
            return Observable.create(observer => {
                navigator.geolocation.getCurrentPosition(pos => {
                    observer.next(pos);
                }), //--- added after adding the Observable at Code line 25 

                    //navigator.geolocation.getCurrentPosition(pos => {
                    //    console.log("Position: ", pos.coords.latitude, ",", pos.coords.longitude); // TODO: REMOVE
                    //    return [pos.coords.latitude,pos.coords.longitude];
                    //},            
                    //err => console.error("Unable to get the position - ", err));
                    err => {
                        return Observable.throw(err);
                    }
            });
        } else {
            //console.error("Geolacation is not available"); // --- Replace code as below
            //return [0,0]  // --- Replace code as below
            return Observable.throw("Geolacation is not available");
        }
    }
    // --- creating a new method ---
    getCurrentWeather(lat: number, long: number): Observable<any> {
        const url = FORECAST_ROOT + FORECAST_KEY + "/" + lat + "," + long;
        const queryParams = "?callback=JSONP_CALLBACK";

        return this.jsonp.get(url + queryParams)
            .map(data => data.json())
            .catch(err => {
                console.error("Unable to get weather data - ", err);
                return Observable.throw(err.json())
            });
    }
    // Adding a Method
    getLocationName(lat: number, long: number): Observable<any> {
        const url = GOOGLE_ROOT;
        const queryParams = "?latlng=" + lat + "," + long + "&key" + GOOGLE_KEY;

        return this.http.get(url + queryParams)
            .map(loc => loc.json())
            .catch(err => {
                console.error("Unable to get location - ", err);
                return Observable.throw(err);
            });
    }  
}