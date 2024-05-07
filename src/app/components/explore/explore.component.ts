import { HttpClient } from '@angular/common/http';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { IUniversity } from '../../interfaces/iuniversity';
import { CountryService } from '../../services/country.service';
import { UniversityService } from '../../services/university.service';
import { Observable, OperatorFunction, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ExploreComponent {
  universities: IUniversity[] = [];
  inputValue: string = '';
  selectValue: string = '';
  countries!: string[];
  isDisplay: boolean = false;
  page: number = 1;
  suggestions: IUniversity[] = [];

  constructor(
    private UniversityService: UniversityService,
    private CountryService: CountryService,
    @Inject(HttpClient) private http: HttpClient
  ) {
    this.CountryService.getCountries().subscribe((response: any) => {
      this.countries = response;
    });
  }
  showDetail() {
    this.UniversityService.university = this.inputValue;
    this.UniversityService.country = this.selectValue;
    this.UniversityService.getUniversity().subscribe((response: any) => {
      this.universities = response;
    });
    this.isDisplay = true;
  }

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term) => {
        if (term.length < 2) {
          return of([]);
        }
        return this.UniversityService.getSuggestions(term).pipe(
          map((suggestions) => suggestions.slice(0, 300)),
          map((universities) =>
            universities.map((university) => university.name)
          )
        );
      })
    );
}
