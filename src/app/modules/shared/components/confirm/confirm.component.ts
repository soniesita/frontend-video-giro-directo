import { Component, inject } from '@angular/core';
import { PagoSoportadoService } from '../../services/pago-soportado.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {

  private pagoSoportadoService = inject(PagoSoportadoService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);



  onNoClick(){
    this.dialogRef.close(3)
  }

  delete(){
    if (this.data != null) {

      this.pagoSoportadoService.deletePagoSoportado(this.data.id).subscribe((data:any) => {
        this.dialogRef.close(1);
      }, (error: any)=>{
        this.dialogRef.close(2);
      })

    } else {
      this.dialogRef.close(2);
    }
  }
}
