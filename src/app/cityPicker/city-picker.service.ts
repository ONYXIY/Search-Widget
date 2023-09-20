import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityPickerService {
  private cities = ['New York', 'San Francisco','Chelyabinsk', 'Chicago', 'Houston']; //тут мог бы быть api, но так как я торопился просто захардкодил

  filterCities(term: string): Observable<string[]> {
    if (!term) {
      return of(this.cities);
    }
    const filtered = this.cities.filter(city => city.toLowerCase().includes(term.toLowerCase()));
    return of(filtered);
  }
}
