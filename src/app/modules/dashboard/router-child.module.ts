import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PagoSoportadoComponent } from '../pago-soportado/components/pago-soportado/pago-soportado.component';




export const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'pago-soportado', component: PagoSoportadoComponent },
]
@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]

})
export class RouterChildModule { }
