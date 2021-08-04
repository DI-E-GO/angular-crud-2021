import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { GeoJson } from '../interfaces/map';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MapService {
  private urlApi:string = 'https://apis.datos.gob.ar/georef/api/ubicacion';
  markersList: AngularFireList<any>;
  constructor(private db: AngularFireDatabase, private _http: HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
   }

   getLocation(lat:number, lng:number): Observable<any>{
    return this._http.get<any>(this.urlApi+'?lat='+lat+'&'+'lon='+lng);
   }

   getMarkers(){
     return this.markersList = this.db.list('/markers')
   }

   createMarker(data: GeoJson){
     return this.db.list('/markers').push(data)
   }

   removeMarker($key: string){
     return this.db.object('/markers/' + $key).remove()
   }
}
