import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagoSoportadoService } from '../../../shared/services/pago-soportado.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-pago-soportado',
  templateUrl: './new-pago-soportado.component.html',
  styleUrl: './new-pago-soportado.component.css'
})
export class NewPagoSoportadoComponent implements OnInit{

  public pagoSoportadoForm!: FormGroup;
  constructor(private fb: FormBuilder , private pagoSoportadoService: PagoSoportadoService , private dialogRef: MatDialogRef<NewPagoSoportadoComponent>){


    this.pagoSoportadoForm = this.fb.group({
          nit: ['',Validators.required],
          razonSocial: ['',Validators.required],
          valorPosiblePago: ['',Validators.required]
    });
  }


  ngOnInit(): void {

  }
  onSave() {

    let data = {
      nit: this.pagoSoportadoForm.get('nit')?.value,
      razonSocial: this.pagoSoportadoForm.get('razonSocial')?.value,
      valorPosiblePago: this.pagoSoportadoForm.get('valorPosiblePago')?.value
    }

    this.pagoSoportadoService.savePagoSoportado(data).subscribe(data => {
      console.log(data);
      this.dialogRef.close(1)
    }, (error: any)=> {
      this.dialogRef.close(2);
    })
  }
  onCancel() {
    this.dialogRef.close(3);
  }

}
