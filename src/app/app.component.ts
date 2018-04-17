import { Component } from '@angular/core';

import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    countrySelect(newValue) {
        console.log(newValue);
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
    map.fitBounds(this.route.getBounds(), {
      padding: point(24, 24),
      maxZoom: 12,
      animate: true
    });
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

  // Marker for the top of Mt. Ranier
  summit = marker([ 46.8523, -121.7603 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  // Marker for the parking lot at the base of Mt. Ranier trails
  paradise = marker([ 46.78465227596462,-121.74141269177198 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  // Path from paradise to summit - most points omitted from this example for brevity
  route = polyline([[ 46.78465227596462,-121.74141269177198 ],
    [ 46.80047278292477, -121.73470708541572 ],
    [ 46.815471360459924, -121.72521826811135 ],
    [ 46.8360239546746, -121.7323131300509 ],
    [ 46.844306448474526, -121.73327445052564 ],
    [ 46.84979408048093, -121.74325201660395 ],
    [ 46.853193528950214, -121.74823296256363 ],
    [ 46.85322881676257, -121.74843915738165 ],
    [ 46.85119913890958, -121.7519719619304 ],
    [ 46.85103829018772, -121.7542376741767 ],
    [ 46.85101557523012, -121.75431755371392 ],
    [ 46.85140013694763, -121.75727385096252 ],
    [ 46.8525277543813, -121.75995212048292 ],
    [ 46.85290292836726, -121.76049157977104 ],
    [ 46.8528160918504, -121.76042997278273 ]]);

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Google Maps': this.googleMaps,
      'Google Hybrid': this.googleHybrid
    },
    overlays: {
      'Mt. Rainier Summit': this.summit,
      'Mt. Rainier Paradise Start': this.paradise,
      'Mt. Rainier Climb Route': this.route
    }
  };


  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [ this.googleMaps],
    zoom: 2,
    center: latLng([ 46.879966, -121.726909 ])
  };
  //, this.route, this.summit, this.paradise 

}