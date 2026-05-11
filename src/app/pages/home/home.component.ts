import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  countries: string[] = [];
  medals: number[] = [];
  public totalCountries: number = 0
  public totalJOs: number = 0

  titlePage: string = "Medals per Country";
  public indicators: { label: string; value: number }[] = [];

  public hasData: boolean = false;
  public error: string = '';
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private dataService: DataService) { }
  
  ngOnInit() {

    this.dataService.getDashboardData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (data) => {

        this.hasData = data.countries.length > 0;

        if (!this.hasData) {
          this.countries = [];
          this.medals = [];
          this.indicators = [];
          this.error = "Aucune donnée."
          return;
        }

        this.countries = data.countries;
        this.medals = data.medals;
        this.totalCountries = data.totalCountries;
        this.totalJOs = data.totalJOs;

        this.indicators = [
          { label: 'Number of countries', value: this.totalCountries },
          { label: 'Number of JOs', value: this.totalJOs }
        ];

      },
      error: (err) => {
        this.hasData = false;
        if (err.status === 404) {
          this.error = 'Données inaccessibles';
        } else {
          this.error = 'Erreur technique, veuillez réessayer plus tard';
        }
      }
    });
  }

  onCountryClicked(country: string): void {
    this.router.navigate(['country', country]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}