import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Proyecto } from '../../../models/Proyecto';
import { ProyectoService } from '../../../services/proyecto.service';
import { Permiso } from '../../../models/Permiso';
import { PermisoService } from '../../../services/permiso.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-creaeditapermiso',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [   MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,],
  templateUrl: './creaeditapermiso.component.html',
  styleUrl: './creaeditapermiso.component.css'
})
export class CreaeditapermisoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaDispositivos: Proyecto[] = [];
  maint: Permiso = new Permiso();
  constructor(
    private formBuilder: FormBuilder,
    private dS: ProyectoService,
    private mS: PermisoService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hfecha: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hnombre: ['', Validators.required],
      hproyecto: ['', Validators.required],
    });
    this.dS.list().subscribe((data) => {
      this.listaDispositivos = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.maint.fechaSubida = this.form.value.hfecha;
      this.maint.descripcionPermiso = this.form.value.hdescripcion;
      this.maint.nombrePermiso = this.form.value.hnombre;
      this.maint.proyecto.idProyecto = this.form.value.hproyecto;

      this.mS.insert(this.maint).subscribe((data) => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
      });
      this.router.navigate(['permisos']);
    }
  }
}
