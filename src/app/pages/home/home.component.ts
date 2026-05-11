import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  countries: string[] = [];
  medals: number[] = [];
  public totalCountries: number = 0
  public totalJOs: number = 0
  public error!: string
  titlePage: string = "Medals per Country";

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getDashboardData().subscribe({
      next: (data) => {
        console.log(`Liste des données : ${JSON.stringify(data)}`);
        this.countries = data.countries;
        this.medals = data.medals;
        this.totalCountries = data.totalCountries;
        this.totalJOs = data.totalJOs;
      },
      error: (err) => {
        console.log(`erreur : ${err}`);
        this.error = err.message
      }
    });
  } 

  onCountryClicked(country: string): void {
    this.router.navigate(['country', country]);
  }

}

