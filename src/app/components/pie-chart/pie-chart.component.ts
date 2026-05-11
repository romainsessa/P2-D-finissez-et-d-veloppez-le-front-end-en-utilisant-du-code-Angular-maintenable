import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnChanges, OnDestroy {

  @Input() label = 'Medals';
  @Input() countries: string[] = [];
  @Input() medals: number[] = [];
  @Input() chartId: string = 'DashboardPieChart';
  @Output() countryClicked = new EventEmitter<string>();

  public pieChart!: Chart<"pie", number[], string>;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.countries?.length &&
      this.medals?.length
    ) {
      this.buildPieChart();
    }
  }

  buildPieChart() {
    this.pieChart?.destroy()
    this.pieChart = new Chart(this.chartId, {
      type: 'pie',
      data: {
        labels: this.countries,
        datasets: [{
          label: this.label,
          data: this.medals,
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5,
        onClick: (e) => {
          if (!e.native) return;

          const points = this.pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true);

          if (points.length) {
            const firstPoint = points[0];
            const countryName = this.pieChart.data.labels ? this.pieChart.data.labels[firstPoint.index] : '';
            this.countryClicked.emit(countryName);
          }

        }
      }
    });

  }

  ngOnDestroy(): void {
    this.pieChart?.destroy();
  }
}
