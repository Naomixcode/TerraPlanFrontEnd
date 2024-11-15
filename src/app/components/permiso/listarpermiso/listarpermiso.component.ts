import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Permiso } from '../../../models/Permiso';
import { PermisoService } from '../../../services/permiso.service';

@Component({
  selector: 'app-listarpermiso',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarpermiso.component.html',
  styleUrl: './listarpermiso.component.css'
})
export class ListarpermisoComponent implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  dataSource: MatTableDataSource<Permiso> = new MatTableDataSource();
  constructor(private mS: PermisoService) {}
  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
