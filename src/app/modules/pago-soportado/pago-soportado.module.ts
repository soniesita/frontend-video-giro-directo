import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoSoportadoComponent } from './components/pago-soportado/pago-soportado.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewPagoSoportadoComponent } from './components/new-pago-soportado/new-pago-soportado.component';



@NgModule({
  declarations: [
    PagoSoportadoComponent,
    NewPagoSoportadoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagoSoportadoModule { }
