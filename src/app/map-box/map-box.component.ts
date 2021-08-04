import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../services/map.service';
import { GeoJson, FeatureCollection } from '../interfaces/map';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 35.75;
  lng = -122.41;
  message = 'Hello world!';
  firstLoad:boolean = true;
  source: any;
  markers: GeoJson[]= [];
  mark: any;
  constructor(private mapService: MapService) { }

  ngOnInit() {
    //this.markers = this.mapService.getMarkers();
    this.initializeMap();
    this.getAllMarkers();
  }

  getAllMarkers(){
    this.mapService.getMarkers().snapshotChanges().subscribe(item =>{
      item.forEach(element =>{
        let m = element.payload.toJSON();
        var elem = new GeoJson(m['geometry']['coordinates'], m['properties']);
        elem.$key=element['key'];
        console.log(elem);
        this.markers.push(elem);
        this.mark=this.markers[this.markers.length-1];
      });
      console.log(this.mark);
    })
  }

  private initializeMap(){
    if(navigator.geolocation&&this.firstLoad){
      this.firstLoad=false;
      navigator.geolocation.getCurrentPosition(position =>{
        this.lat = -38.4530342;//position.coords.latitude;
        this.lng = -63.5989206;//position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat],
        })
      });
    }else{
      if(this.mark!=null){
        this.lng = this.mark['geometry']['coordinates'][0];
        this.lat = this.mark['geometry']['coordinates'][1];
      }
    }
    this.buildMap()
  }

  buildMap(){
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 4,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('click', (event) =>{
      const coordinates = [event.lngLat.lng, event.lngLat.lat]
      const newMarker = new GeoJson(coordinates, {message: this.message})
      this.mapService.getLocation(coordinates[1],coordinates[0]).subscribe(res =>{
        this.message = res['ubicacion']['municipio']['nombre']+', '+res['ubicacion']['departamento']['nombre']+', '+res['ubicacion']['provincia']['nombre']
        console.log(res);
      });
      //this.mapService.createMarker(newMarker);
      //this.markers = [];
      //this.initializeMap();
    })

    this.map.on('load', (event) => {
      this.map.addSource('firebase', {
        type: 'geojson',
        data:{
          type: 'FeatureCollection',
          features: []
        }
      });

      this.source = this.map.getSource('firebase')
      let data = new FeatureCollection(this.markers)
      this.source.setData(data);
     /*  this.markers.subscribe((markers: GeoJson[]) =>{
        let data = new FeatureCollection(markers)
        this.source.setData(data);
      }) */

      this.map.addLayer({
        id: 'firebase',
        source: 'firebase',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
          'text-size': 12,
          'text-transform': 'uppercase',
          'icon-image': 'rocket-15',
          'text-offset': [0, 1.5]
        },
        paint: {
          'text-color': '#f16624',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      })

    })
  }

  removeMarker(marker: { $key: string; }){
    console.log(marker.$key)
    this.mapService.removeMarker(marker.$key)
    this.markers = [];
    this.buildMap();
  }

  flyTo(data: GeoJson){
    this.map.flyTo({
      center: [data['geometry']['coordinates'][0], data['geometry']['coordinates'][1]]
    })
    
  }

}
