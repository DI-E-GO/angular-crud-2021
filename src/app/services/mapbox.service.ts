import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from 'src/environments/environment';
import { map } from 'rxjs/operators';

export interface MapboxOutput{
  attribution: string;
  features: Feature[];
  query:[];
}
export interface Feature{
  text: string;
  place_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor(private http: HttpClient) { }

  searchLocation(query: string){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get(url+query+'.json?access_token='+environment.mapbox.accessToken)
    .pipe(map((res: MapboxOutput)=>{
      return res.features;
    }));
  }
}
