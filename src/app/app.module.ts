import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


import { AppComponent } from './app.component';
//import { EsriMapComponent } from './esri-map/esri-map.component';


@NgModule({
  declarations: [
    AppComponent,
    //EsriMapComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
