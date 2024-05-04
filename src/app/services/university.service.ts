import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IUniversity } from '../iuniversity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniversityService {
  constructor(@Inject(HttpClient) private http: HttpClient) {}

  university: string = '';
  country: string = '';

  getUniversity() {
    return this.http.get(
      `http://universities.hipolabs.com/search?name=${this.university}&country=${this.country}`
    );
  }

  getSuggestions(inputValue: string): Observable<IUniversity[]> {
    return this.http.get<IUniversity[]>(
      `http://universities.hipolabs.com/search?name=${inputValue}`
    );
  }
}
