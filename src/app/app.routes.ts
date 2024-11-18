import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListarUsuarioComponent } from './components/usuario/listarusuario/listarusuario.component';
import { CreaEditaUsuarioComponent } from './components/usuario/creaeditausuario/creaeditausuario.component';
import { RolComponent } from './components/rol/rol.component';
import { ListarRolComponent } from './components/rol/listarrol/listarrol.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { ListarNotificacionComponent } from './components/notificacion/listarnotificacion/listarnotificacion.component';
import { CreaEditaNotificacionComponent } from './components/notificacion/creaeditanotificacion/creaeditanotificacion.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { ListarProyectoComponent } from './components/proyecto/listarproyecto/listarproyecto.component';
import { CreaEditaProyectoComponent } from './components/proyecto/creaeditaproyecto/creaeditaproyecto.component';
import { PermisoComponent } from './components/permiso/permiso.component';
import { ListarPermisoComponent } from './components/permiso/listarpermiso/listarpermiso.component';
import { CreaEditaPermisoComponent } from './components/permiso/creaeditapermiso/creaeditapermiso.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { ListarComentarioComponent } from './components/comentario/listarcomentario/listarcomentario.component';
import { CreaEditaComentarioComponent } from './components/comentario/creaeditacomentario/creaeditacomentario.component';
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component';
import { ListarEvaluacionComponent } from './components/evaluacion/listarevaluacion/listarevaluacion.component';
import { CreaEditaEvaluacionComponent } from './components/evaluacion/creaeditaevaluacion/creaeditaevaluacion.component';
import { TerrenoComponent } from './components/terreno/terreno.component';
import { ListarTerrenoComponent } from './components/terreno/listarterreno/listarterreno.component';
import { CreaEditaTerrenoComponent } from './components/terreno/creaeditaterreno/creaeditaterreno.component';
import { PlanoComponent } from './components/plano/plano.component';
import { ListarPlanoComponent } from './components/plano/listarplano/listarplano.component';
import { CreaEditaPlanoComponent } from './components/plano/creaeditaplano/creaeditaplano.component';
import { PrototipoComponent } from './components/prototipo/prototipo.component';
import { ListarPrototipoComponent } from './components/prototipo/listarprototipo/listarprototipo.component';
import { CreaEditaPrototipoComponent } from './components/prototipo/creaeditaprototipo/creaeditaprototipo.component';
import { PrototipoMaterialComponent } from './components/prototipomaterial/prototipomaterial.component';
import { ListarPrototipoMaterialComponent } from './components/prototipomaterial/listarprototipomaterial/listarprototipomaterial.component';
import { MaterialComponent } from './components/material/material.component';
import { ListarMaterialComponent } from './components/material/listarmaterial/listarmaterial.component';
import { CreaEditaPrototipoMaterialComponent } from './components/prototipomaterial/creaeditaprototipomaterial/creaeditaprototipomaterial.component';
import { CreaEditaMaterialComponent } from './components/material/creaeditamaterial/creaeditamaterial.component';
import { ComentariosPorUsuarioComponent } from './components/reportes/comentario-por-usuario/comentarios-por-usuario.component';
import { ProyectosPorUsuarioComponent } from './components/reportes/proyecto-por-usuario/proyectos-por-usuario.component';
import { ProyectosPorEstadoComponent } from './components/reportes/proyectos-por-estado/proyectos-por-estado.component';
import { TerrenosPorProyectoComponent } from './components/reportes/terrenos-por-proyecto/terrenos-por-proyecto.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
      path: '',
      canActivate: [seguridadGuard],
      children: [
        { path: 'home', component: HomeComponent },
        {
          path: 'usuarios',
          component: UsuarioComponent,
          children: [
            { path: '', component: ListarUsuarioComponent },
            { path: 'nuevo', component: CreaEditaUsuarioComponent },
            { path: 'editar/:id', component: CreaEditaUsuarioComponent }
          ]
        },
        {
          path: 'rol',
          component: RolComponent, // Componente principal de roles
          children: [
            { path: '', component: ListarRolComponent },
          ]
        },
        {
          path: 'notificaciones',
          component: NotificacionComponent,
          children: [
            { path: '', component: ListarNotificacionComponent },
            { path: 'nuevo', component: CreaEditaNotificacionComponent },
            { path: 'editar/:id', component: CreaEditaNotificacionComponent }
          ]
        },
        {
          path: 'proyectos',
          component: ProyectoComponent,
          children: [
            { path: '', component: ListarProyectoComponent },
            { path: 'nuevo', component: CreaEditaProyectoComponent },
            { path: 'editar/:id', component: CreaEditaProyectoComponent }
          ]
        },
        {
          path: 'permisos',
          component: PermisoComponent,
          children: [
            { path: '', component: ListarPermisoComponent },
            { path: 'nuevo', component: CreaEditaPermisoComponent },
            { path: 'editar/:id', component: CreaEditaPermisoComponent }
          ]
        },
        {
          path: 'comentarios',
          component: ComentarioComponent,
          children: [
            { path: '', component: ListarComentarioComponent },
            { path: 'nuevo', component: CreaEditaComentarioComponent },
            { path: 'editar/:id', component: CreaEditaComentarioComponent }
          ]
        },
        {
          path: 'evaluaciones',
          component: EvaluacionComponent,
          children: [
            { path: '', component: ListarEvaluacionComponent },
            { path: 'nuevo', component: CreaEditaEvaluacionComponent },
            { path: 'editar/:id', component: CreaEditaEvaluacionComponent }
          ]
        },
        {
          path: 'terrenos',
          component: TerrenoComponent,
          children: [
            { path: '', component: ListarTerrenoComponent },
            { path: 'nuevo', component: CreaEditaTerrenoComponent },
            { path: 'editar/:id', component: CreaEditaTerrenoComponent }
          ]
        },
        {
          path: 'planos',
          component: PlanoComponent,
          children: [
            { path: '', component: ListarPlanoComponent },
            { path: 'nuevo', component: CreaEditaPlanoComponent },
            { path: 'editar/:id', component: CreaEditaPlanoComponent }
          ]
        },
        {
          path: 'prototipos',
          component: PrototipoComponent,
          children: [
            { path: '', component: ListarPrototipoComponent },
            { path: 'nuevo', component: CreaEditaPrototipoComponent },
            { path: 'editar/:id', component: CreaEditaPrototipoComponent }
          ]
        },
        {
          path: 'prototipos-material',
          component: PrototipoMaterialComponent,
          children: [
            { path: '', component: ListarPrototipoMaterialComponent },
            { path: 'nuevo', component: CreaEditaPrototipoMaterialComponent },
            { path: 'editar/:id', component: CreaEditaPrototipoMaterialComponent }
          ]
        },
        {
          path: 'materiales',
          component: MaterialComponent,
          children: [
            { path: '', component: ListarMaterialComponent },
            { path: 'nuevo', component: CreaEditaMaterialComponent },
            { path: 'editar/:id', component: CreaEditaMaterialComponent }
          ]
        },
        {
          path: 'reportes',
          children: [
            { path: 'comentarios-por-usuario', component: ComentariosPorUsuarioComponent },
            { path: 'proyectos-por-usuario', component: ProyectosPorUsuarioComponent },
            { path: 'proyectos-por-estado', component: ProyectosPorEstadoComponent },
            { path: 'terrenos-por-proyecto', component: TerrenosPorProyectoComponent }
          ]
        },
        { path: '', redirectTo: '/home', pathMatch: 'full' }
      ]
    },
  ];
  