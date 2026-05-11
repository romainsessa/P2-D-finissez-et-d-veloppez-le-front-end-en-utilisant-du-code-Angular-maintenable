import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;

  public titlePage: string = '';
  public indicators : { label: string; value: number }[] = [];

  public years: number[] = [];
  public medals: number[] = [];
  public error!: string;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {  }

  ngOnInit() {
    let countryName: string | null = null
    this.route.paramMap.subscribe((param: ParamMap) => countryName = param.get('countryName'));

    if (!countryName) {
      this.router.navigate(['/']);
      return;
    }

    this.dataService.getCountryDetails(countryName).subscribe({
      next: (data) => {
        this.titlePage = data.titlePage;
        this.totalEntries = data.totalEntries;
        this.totalMedals = data.totalMedals;
        this.totalAthletes = data.totalAthletes;
        this.years = data.years;
        this.medals = data.medals;

        this.indicators =[
        { label: 'Number of entries', value: this.totalEntries },
        { label: 'Total number medals', value: this.totalMedals },
        { label: 'Total number of athletes', value: this.totalAthletes }
      ];

    },
      error: (err) => {
        console.log(`erreur : ${err}`);
        this.error = err.message
      }
    });
}
}
