import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tempUnit'    
})
export class TempUnitPipe implements PipeTransform {
    transform(temp: number, unitType: string ) {
        if (unitType == "fahrenheit") {
            const celcius = (temp - 32) * 0.5556;
            return celcius;            
        } else {
            return temp;
        }
    }
}
