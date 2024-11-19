import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../../models/Usuario';
import { Proyecto } from '../../../models/Proyecto';
import { Evaluacion } from '../../../models/Evaluacion';
import { Comentario } from '../../../models/Comentario';
import { UsuarioService } from '../../../services/usuario.service';
import { ProyectoService } from '../../../services/proyecto.service';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { ComentarioService } from '../../../services/comentario.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-creaeditacomentario',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule, // Importa el módulo para formularios reactivos
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatOptionModule,
  ],
  templateUrl: './creaeditacomentario.component.html',
  styleUrls: ['./creaeditacomentario.component.css'],
})
export class CreaEditaComentarioComponent implements OnInit {
  commentForm!: FormGroup;
  isEditMode: boolean = false;
  idComentario!: number;
  usuariosDisponibles: Usuario[] = [];
  proyectosDisponibles: Proyecto[] = [];
  evaluacionesDisponibles: Evaluacion[] = [];
  startDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private comentarioService: ComentarioService,
    private usuarioService: UsuarioService,
    private proyectoService: ProyectoService,
    private evaluacionService: EvaluacionService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idComentario = params['id'];
      this.isEditMode = !!this.idComentario;
      this.initForm();
      this.loadUsuarios();
      this.loadProyectos();
      this.loadEvaluaciones();

      if (this.isEditMode) {
        this.loadCommentData();
      }
    });
  }

  private initForm(): void {
    this.commentForm = this.formBuilder.group({
      idComentario: [{ value: '', disabled: this.isEditMode }],
      contenidoComentario: ['', Validators.required],
      fechaComentario: ['', Validators.required],
      idUsuario: ['', Validators.required],
      idProyecto: ['', Validators.required],
      idEvaluacion: ['', Validators.required],
    });
  }

  private loadUsuarios(): void {
    this.usuarioService.list().subscribe(
      (usuarios) => {
        this.usuariosDisponibles = usuarios;
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  private loadProyectos(): void {
    this.proyectoService.list().subscribe(
      (proyectos) => {
        this.proyectosDisponibles = proyectos;
      },
      (error) => {
        console.error('Error al cargar proyectos:', error);
      }
    );
  }

  private loadEvaluaciones(): void {
    this.evaluacionService.list().subscribe(
      (evaluaciones) => {
        this.evaluacionesDisponibles = evaluaciones;
      },
      (error) => {
        console.error('Error al cargar evaluaciones:', error);
      }
    );
  }

  private loadCommentData(): void {
    this.comentarioService.getComentarioById(this.idComentario).subscribe((data) => {
      this.commentForm.patchValue({
        idComentario: data.idComentario,
        contenidoComentario: data.contenidoComentario,
        fechaComentario: data.fechaComentario,
        idUsuario: data.idUsuario,
        idProyecto: data.idProyecto,
        idEvaluacion: data.idEvaluacion,
      });
    });
  }

  saveComment(): void {
    if (this.commentForm.valid) {
      const commentToSave = this.commentForm.getRawValue();

      if (this.isEditMode) {
        this.comentarioService.update(commentToSave).subscribe(
          () => {
            this.snackBar.open('Comentario actualizado exitosamente', 'Cerrar', { duration: 3000 });
            this.navigateToComments();
          },
          (error) => {
            console.error('Error al actualizar el comentario:', error);
            this.snackBar.open('Error al actualizar el comentario.', 'Cerrar', { duration: 3000 });
          }
        );
      } else {
        this.comentarioService.create(commentToSave).subscribe(
          () => {
            this.snackBar.open('Comentario registrado exitosamente', 'Cerrar', { duration: 3000 });
            this.navigateToComments();
          },
          (error) => {
            console.error('Error al registrar el comentario:', error);
            this.snackBar.open('Error al registrar el comentario.', 'Cerrar', { duration: 3000 });
          }
        );
      }
    } else {
      this.commentForm.markAllAsTouched();
    }
  }

  navigateToComments(): void {
    this.router.navigate(['/comentarios']);
  }
}
