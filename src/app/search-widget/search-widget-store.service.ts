import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchStore {
  private fromCitySubject = new BehaviorSubject<string | null>(null);
  private toCitySubject = new BehaviorSubject<string | null>(null);

  fromCity$ = this.fromCitySubject.asObservable();
  toCity$ = this.toCitySubject.asObservable();

  constructor() {
    const fromCity = localStorage.getItem('fromCity');
    const toCity = localStorage.getItem('toCity');
    if (fromCity) this.fromCitySubject.next(fromCity);
    if (toCity) this.toCitySubject.next(toCity);
  }

  updateLocalStorage(fromCity: string, toCity: string) {
    localStorage.setItem('fromCity', fromCity);
    localStorage.setItem('toCity', toCity);
  }

  setFromCity(city: string) {
    this.fromCitySubject.next(city);
    localStorage.setItem('fromCity', city);
  }

  setToCity(city: string) {
    this.toCitySubject.next(city);
    localStorage.setItem('toCity', city);
  }
}
