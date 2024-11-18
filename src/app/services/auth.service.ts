import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
  const router = inject(Router);

  // Clona la solicitud y añade el token si existe
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error) => {

      // Manejo de errores 401 (Unauthorized)
      if (error.status === 401) {
        const currentRoute = router.url; // Obtiene la ruta actual antes del error

        // Extraer la ruta base de la URL actual
        const baseRoute = currentRoute.split('/')[1]; // Obtiene la primera parte de la ruta
        const redirectTo = `/${baseRoute}`; // Construye la ruta base a redirigir

        // Redirigir a la ruta base
        router.navigate([redirectTo]).then(() => {
          // Mostrar el SweetAlert después de la redirección
          Swal.fire({
            icon: 'error',
            title: 'No Autorizado',
            text: 'No tienes permisos para realizar esta acción o la accion que intentas realizar viola una restriccion de llave foranea.',
          });
        });
      }

      return throwError(() => error);
    })
  );
};
