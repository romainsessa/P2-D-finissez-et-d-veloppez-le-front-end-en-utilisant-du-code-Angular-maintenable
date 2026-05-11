import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private olympicUrl = './assets/mock/olympic.json';

  constructor(private http: HttpClient) { }

  getOlympicData(): Observable<Country[]> {
    return this.http.get<Country[]>(this.olympicUrl);
  }

  getDashboardData(): Observable<{
    countries: string[];
    medals: number[];
    totalCountries: number;
    totalJOs: number;
  }> {
    return this.getOlympicData().pipe(
      map(data => {

        if (!data || data.length === 0) {
          return {
            countries: [],
            medals: [],
            totalCountries: 0,
            totalJOs: 0
          };
        }

        const countries = data.map(d => d.country);

        const medals = data.map(d =>
          d.participations.reduce(
            (acc, p) => acc + p.medalsCount,
            0
          )
        );

        const totalJOs = new Set(
          data.flatMap(d =>
            d.participations.map(p => p.year)
          )
        ).size;

        return {
          countries,
          medals,
          totalCountries: countries.length,
          totalJOs
        };
      })
    );
  }

  getCountryDetails(countryName: string): Observable<{
    totalEntries: number;
    totalMedals: number;
    totalAthletes: number;
    years: number[];
    medals: number[];
  }> {
    return this.getOlympicData().pipe(
      map(data => {
        const country = data.find(c => c.country === countryName);

        if (!country) {
          throw new Error('Country not found');
        }

        const years = country.participations.map(p => p.year);
        const medals = country.participations.map(p => p.medalsCount);

        return {
          totalEntries: country.participations.length,
          years,
          medals,
          totalMedals: medals.reduce((a, b) => a + b, 0),
          totalAthletes: country.participations.reduce(
            (acc, p) => acc + p.athleteCount,
            0
          )
        };
      })
    );
  }

}