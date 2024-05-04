import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(@Inject(HttpClient) private http: HttpClient) {}

  getCountries() {
    return this.http.get('https://restcountries.com/v3.1/all');
  }
}
