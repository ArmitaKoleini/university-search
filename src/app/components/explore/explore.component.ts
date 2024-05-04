import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { IUniversity } from '../../iuniversity';
import { CountryService } from '../../services/country.service';
import { UniversityService } from '../../services/university.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css',
})
export class ExploreComponent {
  universities!: IUniversity[];
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

  getSuggestions(query: string) {
    this.http
      .get<IUniversity[]>(
        `http://universities.hipolabs.com/search?name=${query}`
      )
      .subscribe((results) => {
        this.suggestions = results;
      });
  }
  onSelect(university: IUniversity) {
    this.inputValue = university.name; // Set selected university name
    this.suggestions = []; // Clear suggestions (optional)
    // Perform additional actions based on selection
  }
}
