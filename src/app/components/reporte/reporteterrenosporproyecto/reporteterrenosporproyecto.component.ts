import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ProyectoService } from '../../../services/proyecto.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reporteterrenosporproyecto',
  standalone: true,
  imports: [ReactiveFormsModule, BaseChartDirective],
  templateUrl: './reporteterrenosporproyecto.component.html',
  styleUrl: './reporteterrenosporproyecto.component.css'
})
export class ReporteterrenosporproyectoComponent{
  
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  idProyecto: number = 1;
  constructor(private mS: ProyectoService) {}
  ngOnInit(): void {
    this.mS.getTerrenosporProyecto(this.idProyecto).subscribe((data) => {
      this.barChartLabels=data.map(item=>item.proyectoNombre)
      this.barChartData=
      [
        {
          data:data.map(item=>item.numTerrenos),
          label:'Monto invertido en mantenimientos',
          backgroundColor:['#ee3007','#f08e79','#e98215'],
          borderColor:'#e94215',
          borderWidth:1
        }
      ]
    });
  }
}
