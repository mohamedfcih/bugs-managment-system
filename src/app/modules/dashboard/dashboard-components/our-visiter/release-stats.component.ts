import {
  Component,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { DemoMaterialModule } from 'src/app/demo-material-module';

export interface StatsChartOptions {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
  tooltip: ApexTooltip | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  stroke: any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
}

@Component({
  selector: 'app-release-stats',
  standalone: true,
  imports: [NgApexchartsModule, DemoMaterialModule],
  templateUrl: './release-stats.component.html',
})
export class ReleaseStatsComponent {
  @ViewChild('release-chart') chart: ChartComponent = Object.create(null);
  @Input() item: any;
  private readonly router = inject(Router)
  public StatsChartOptions!: Partial<StatsChartOptions>;

  constructor() {}

  ngOnInit(): void {
    if (this.item) {
      this.buildOptions();
    }
  }

  handleClick(event: any): void {
    console.log(event);
  }

  onChartSelection(event: any, chart: any): void {
    let status =
    event.target.classList.contains('apexcharts-donut-slice-0') ? 'To Do' :
    event.target.classList.contains('apexcharts-donut-slice-1') ? 'In progress' :
    event.target.classList.contains('apexcharts-donut-slice-2') ? 'Done' :
    event.target.classList.contains('apexcharts-donut-slice-3') ? 'Canceled' :
    undefined;
    this.navigateToDashboard(status)



  }

  navigateToDashboard(status:any){
    const serializedObj = JSON.stringify({status:status,release:this.item.name});
    this.router.navigate(['/bugs'], { queryParams: { data: serializedObj } });
  }

  buildOptions() {
    this.StatsChartOptions = {
      chart: {
        type: 'donut',
        fontFamily: 'Poppins,sans-serif',
        height: 253,
        events: {
          click: (event: any, chartContext: any) =>
            this.onChartSelection(event, chartContext),
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '80px',
          },
        },
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      labels: ['To do', 'In progress', 'Done', 'Canceled'],
      colors: ['#1e88e5', '#26c6da', '#745af2', '#727b84'],
      responsive: [
        {
          breakpoint: 767,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
    };
  }
}
