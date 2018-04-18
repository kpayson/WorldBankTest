import { Component,OnInit  } from '@angular/core';

import { icon, latLng, Map, marker, point, polyline, tileLayer, multiple } from 'leaflet';

import { CountryDataService } from './country-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private countryDataService: CountryDataService) { }
    countries: any[];
    map: Map;

    ngOnInit() {
      // Retrieve posts from the API
      this.countryDataService.getAllCountries()
        .subscribe((countries) => {
          this.countries = countries;
          //countries.map(
          //  (c) => ({name:c.name,alpha3:c['alpha-3']}));
        }
      );
      

    }

    countrySelect(newValue) {
        console.log(newValue);
        this.countryDataService.getCountryGIS(newValue)
        .subscribe((gis)=> {
          console.log(gis);
          var pgon = polyline(gis.features[0].geometry.rings);

          this.map.fitBounds(pgon.getBounds(), {
            padding: point(0, 0),
            maxZoom: 6,
            animate: true
          });

          
        })
    }

    // Set our map properties
    mapCenter = [-122.4194, 37.7749];
    basemapType = 'satellite';
    mapZoomLevel = 12;
  
    // See app.component.html
    mapLoadedEvent(status: boolean) {
      console.log('The map loaded: ' + status);
    }

  onMapReady(map: Map) {
    this.map = map;

  }

  // Define our base layers so we can reference them multiple times
  googleMaps = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: true
  });
  googleHybrid = tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: true
  });


  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Google Maps': this.googleMaps,
      'Google Hybrid': this.googleHybrid
    }
  };


  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [ this.googleMaps],
    zoom: 7,
    center: latLng([ 46.879966, -121.726909 ])
  };

}