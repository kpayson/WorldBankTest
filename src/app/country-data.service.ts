import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CountryDataService {

  constructor(private http: Http) { }

  // Get all posts from the API
  getAllCountries() {
    return this.http.get('/api/countries')
      .map(res => res.json());
  }
}
