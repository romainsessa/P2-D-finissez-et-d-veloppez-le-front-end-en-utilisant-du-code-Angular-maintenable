import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnChanges, OnDestroy {

  @Input() years: number[] = [];
  @Input() medals: string[] = [];
  public lineChart!: Chart<"line", string[], number>;

  ngOnChanges(changes: SimpleChanges): void {
     if (
      this.years?.length &&
      this.medals?.length
    ) {
      this.buildLineChart();
    }
  }

  buildLineChart() {
    this.lineChart = new Chart("countryChart", {
      type: 'line',
      data: {
        labels: this.years,
        datasets: [
          {
            label: "medals",
            data: this.medals,
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  ngOnDestroy(): void {
    this.lineChart?.destroy;
  }

}
