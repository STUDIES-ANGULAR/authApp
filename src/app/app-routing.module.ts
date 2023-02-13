import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [

  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path:'dashboard',
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule ),
    canActivate : [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path:'**',
    redirectTo:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false //si es True: Manejo de rutas con hash ( # ), concatena el #  para evitar error de rutas en despliuegue al recargar
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
