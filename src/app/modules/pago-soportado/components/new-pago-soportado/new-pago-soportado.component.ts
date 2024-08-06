import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagoSoportadoService } from '../../../shared/services/pago-soportado.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-pago-soportado',
  templateUrl: './new-pago-soportado.component.html',
  styleUrl: './new-pago-soportado.component.css'
})
export class NewPagoSoportadoComponent implements OnInit{

    public pagoSoportadoForm!: FormGroup;
    private fb = inject(FormBuilder);
    private pagoSoportadoService = inject(PagoSoportadoService);
    private dialogRef = inject(MatDialogRef);
    public data = inject(MAT_DIALOG_DATA);
    estadoFormulario: string ="";


  ngOnInit(): void {

    console.log(this.data ,'data ');
    this.estadoFormulario = "Agregar";
    this.pagoSoportadoForm = this.fb.group({
              nit: ['',Validators.required],
              razonSocial: ['',Validators.required],
              valorPosiblePago: ['',Validators.required]
        });

        if(this.data != null){
          this.updateForm(this.data);
          this,this.estadoFormulario = "Actualizar"
        }
  }
  onSave() {

    let data = {
      nit: this.pagoSoportadoForm.get('nit')?.value,
      razonSocial: this.pagoSoportadoForm.get('razonSocial')?.value,
      valorPosiblePago: this.pagoSoportadoForm.get('valorPosiblePago')?.value
    }

    if (this.data != null) {
      //update
      this.pagoSoportadoService.updatePagoSoportado(data, this.data.id).subscribe( (data:any) => {
        this.dialogRef.close(1);
      }, (error: any)=>{
        this.dialogRef.close(2);
      })

    } else {
      //create
      this.pagoSoportadoService.savePagoSoportado(data).subscribe((data : any) => {
        console.log(data);
        this.dialogRef.close(1);
      }, (error: any)=> {
        this.dialogRef.close(2);
      })
    }
  }
  onCancel() {
    this.dialogRef.close(3);
  }

  updateForm(data: any){
    this.pagoSoportadoForm = this.fb.group({
      nit: [data.nit, Validators.required],
      razonSocial: [data.razonSocial, Validators.required],
      valorPosiblePago: [data.valorPosiblePago, Validators.required]
    });
  }

}
