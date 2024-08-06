import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8099/api/v1"

@Injectable({
  providedIn: 'root'
})
export class PagoSoportadoService {

  constructor(private http: HttpClient) { }

  getPagoSoportado(){

    const endpoint =`${base_url}/pago-soportado-factura`;
    return this.http.get(endpoint)
  };

  savePagoSoportado(body: any){
    const endpoint =`${base_url}/pago-soportado-factura`;
    return this.http.post(endpoint, body);

  }

  updatePagoSoportado(body:any , id:any){
    const endpoint =`${base_url}/pago-soportado-factura/ ${id}`;
    return this.http.put(endpoint, body);
  }
  deletePagoSoportado(id: any){
    const endpoint =`${base_url}/pago-soportado-factura/ ${id}`;
    return this.http.delete(endpoint);
  }
}
