import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '../datePicker/date-picker.component';
import { CityPickerService } from '../cityPicker/city-picker.service';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, startWith, switchMap } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { SearchStore } from './search-widget-store.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-widget',
  standalone: true,
  imports: [CommonModule, DatePickerComponent, MatButtonModule, MatInputModule, MatFormFieldModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.scss'],
  providers: [SearchStore]
})
export class SearchWidgetComponent implements OnInit {
  private readonly cityPickerService = inject(CityPickerService)
  private readonly searchWidgetStore = inject(SearchStore)

  public fromCityCtrl = new FormControl();
  public toCityCtrl = new FormControl();
  public filteredCitiesFrom!: Observable<string[]>;
  public filteredCitiesTo!: Observable<string[]>;
  public hasError: boolean = false;

  ngOnInit() {
    this.fromCityCtrl.setValidators(Validators.required);
  this.toCityCtrl.setValidators(Validators.required);
    this.filteredCitiesFrom = this.fromCityCtrl.valueChanges.pipe(
      startWith(''),
      switchMap(term => this.cityPickerService.filterCities(term))
    );

    this.filteredCitiesTo = this.toCityCtrl.valueChanges.pipe(
      startWith(''),
      switchMap(term => this.cityPickerService.filterCities(term))
    );
  }

  updateSelectedFromCity(event: any) {
    const selectedCity = event?.option?.value || null;
    if (selectedCity) {
      this.searchWidgetStore.setFromCity(selectedCity);
    }
  }

  updateSelectedToCity(event: any) {
    const selectedCity = event?.option?.value || null;
    if (selectedCity) {
      this.searchWidgetStore.setToCity(selectedCity);
    }
  }

  updateFilteredCitiesFrom(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fromCityCtrl.setValue(input.value);
  }

  updateFilteredCitiesTo(event: Event) {
    const input = event.target as HTMLInputElement;
    this.toCityCtrl.setValue(input.value);
  }

  onSubmit() {
    const fromCityValue = this.fromCityCtrl.value;
    const toCityValue = this.toCityCtrl.value;
    if (this.fromCityCtrl.valid && fromCityValue && this.toCityCtrl.valid && toCityValue) {
      this.searchWidgetStore.updateLocalStorage(fromCityValue, toCityValue);
      this.hasError = false;
    } else {
      this.hasError = true;
    }
}
}