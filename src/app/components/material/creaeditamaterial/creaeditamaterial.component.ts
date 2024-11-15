import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Material } from '../../../models/Material';
import { MaterialService } from '../../../services/material.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditamaterial',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creaeditamaterial.component.html',
  styleUrl: './creaeditamaterial.component.css',
})
export class CreaeditamaterialComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  material: Material = new Material();

  id: number = 0;
  edicion: boolean = false;

  listaMarcas: { value: string; viewValue: string }[] = [
    { value: 'HP', viewValue: 'HP' },
    { value: 'Samsumg', viewValue: 'Samsumg' },
    { value: 'LG', viewValue: 'LG' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private dS: MaterialService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      htipo: ['', Validators.required],
      hcosto: ['', Validators.required],
      hcantidad: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.material.idMaterial = this.form.value.hcodigo;
      this.material.tipoMaterial = this.form.value.htipo;
      this.material.costoMaterial = this.form.value.hcosto;
      this.material.cantidadMaterial = this.form.value.hcantidad;
      if (this.edicion) {
        //update
        this.dS.update(this.material).subscribe(data=> {
          this.dS.list().subscribe(data=>{
            this.dS.setList(data)
          })
        });
      } else {
        //insertar
        this.dS.insert(this.material).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['materiales']);
  }
  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idMaterial),
          htipo: new FormControl(data.tipoMaterial),
          hcosto: new FormControl(data.costoMaterial),
          hcantidad: new FormControl(data.cantidadMaterial),
        });
      });
    }
  }
}
