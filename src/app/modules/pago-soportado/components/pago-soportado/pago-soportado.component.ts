import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PagoSoportadoService } from '../../../shared/services/pago-soportado.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NewPagoSoportadoComponent } from '../new-pago-soportado/new-pago-soportado.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-pago-soportado',
  templateUrl: './pago-soportado.component.html',
  styleUrl: './pago-soportado.component.css',
})
export class PagoSoportadoComponent implements OnInit {

  private pagoSoportadoService = inject(PagoSoportadoService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getPagoSoportado();
  }

  displayedColumns: string[] = [
    'id',
    'nit',
    'razonSocial',
    'valorPosiblePago',
    'actions'
  ];
  dataSource = new MatTableDataSource<PagoSoportadoElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getPagoSoportado():void {

    this.pagoSoportadoService.getPagoSoportado().subscribe( (data:any) => {
        console.log('respuesta de pagos soportados', data);
        this.processPagoSoportadoSuministroResponse(data);
      }, (error: any) => {
        console.log('error:', error);
      });
  }

  processPagoSoportadoSuministroResponse(resp: any) {


    if (Array.isArray(resp)) {
      const dataPagoSoportadoSuministro: PagoSoportadoElement[] = resp.map((item: any) => ({
        id: item.id,
        nit: item.nit,
        razonSocial: item.razonSocial,
        valorPosiblePago: item.valorPosiblePago

      }));

      this.dataSource = new MatTableDataSource<PagoSoportadoElement>(dataPagoSoportadoSuministro);
      this.dataSource.paginator = this.paginator;
    } else {
      console.log("Respuesta no es un array.");
    }
  }

  openPagoSoportadoDialog(){
    const dialogRef = this.dialog.open( NewPagoSoportadoComponent, {
      width:'450px'

    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result==1) {
        this.openSnackBar("Pago agregado","Exitosa");
        this.getPagoSoportado();
      } else if (result==2){
        this.openSnackBar("Se produjo un error al guardar el nuevo pago","Error");
      }
    });
  }

  edit(id:number, nit: string, razonSocial: string, valorPosiblePago: number){
    const dialogRef = this.dialog.open( NewPagoSoportadoComponent, {
      width:'450px',
      data: {id: id, nit: nit, razonSocial: razonSocial, valorPosiblePago: valorPosiblePago}

    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result==1) {
        this.openSnackBar("Pago actualizado","Exitosa");
        this.getPagoSoportado();
      } else if (result==2){
        this.openSnackBar("Se produjo un error al editar el pago","Error");
      }
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
    data: {id: id}

    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if (result == 1) {
        this.openSnackBar("Pago eliminado","Exitosa");
        this.getPagoSoportado();
      } else if (result == 2){
        this.openSnackBar("Se produjo un error al eliminar el pago","Error");
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration:2000
    })
  }
}

export interface PagoSoportadoElement {
  id: number;
  nit: string;
  razonSocial: string;
  valorPosiblePago: number;
}
