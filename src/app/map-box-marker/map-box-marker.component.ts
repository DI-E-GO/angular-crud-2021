import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map-box-marker',
  templateUrl: './map-box-marker.component.html',
  styleUrls: ['./map-box-marker.component.css']
})
export class MapBoxMarkerComponent implements OnInit {

  public mapa = Mapboxgl.Map;
  geojson = {
    'type': 'FeatureCollection',
    'features': [
    {
    'type': 'Feature',
    'properties': {
    'message': 'Foo',
    'iconSize': [60, 60]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [-65.2740954, -24.2176374]
    }
    },
    {
    'type': 'Feature',
    'properties': {
    'message': 'Bar',
    'iconSize': [50, 50]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [-65.2740954, -24.2176900]
    }
    },
    {
    'type': 'Feature',
    'properties': {
    'message': 'Baz',
    'iconSize': [40, 40]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [-65.2750000, -24.2176374]
    }
    }
    ]
    };
  constructor() { }

  ngOnInit(){
    Mapboxgl.accessToken = environment.mapbox.accessToken;
    this.mapa = new Mapboxgl.Map({
    container: 'map-mapbox', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-65.2740954,-24.2176374], // starting position- lng -> lat
    zoom: 16 // starting zoom
    });
    this.createMarker(-65.2740954,-24.2176374);
    this.addNavigation();
  }
   public createMarker(lng:number, lat:number){
     const marker = new Mapboxgl.Marker({
       draggable: true
     }).setLngLat([lng, lat]).addTo( this.mapa);

     marker.on('dragend', ()=>{
       console.log(marker.getLngLat());
     })
   }

   addNavigation(){
    var nav = new Mapboxgl.NavigationControl();
    this.mapa.addControl(nav, 'top-left');
   }
}


