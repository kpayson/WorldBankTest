import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


import { AppComponent } from './app.component';
import { CountryDataService} from './country-data.service'
//import { EsriMapComponent } from './esri-map/esri-map.component';


@NgModule({
  declarations: [
    AppComponent,
    //EsriMapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule, 
    LeafletModule.forRoot()
  ],
  providers: [CountryDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
