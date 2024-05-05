import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IUniversity } from '../iuniversity';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniversityService {
  constructor(@Inject(HttpClient) private http: HttpClient) {}

  university: string = '';
  country: string = '';
  url: string = '';

  getUniversity() {
    this.url = `http://universities.hipolabs.com/search?name=${this.university}`;
    if (this.country) {
      this.url += `&country=${this.country}`;
    }
    return this.http.get(this.url);
  }

  getSuggestions(inputValue: string): Observable<IUniversity[]> {
    return this.http
      .get<IUniversity[]>(
        `http://universities.hipolabs.com/search?name=${inputValue}`
      )
      .pipe(
        map((response) => response),
        map((universities) => universities.slice(0, 300))
      );
  }
}
