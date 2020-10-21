import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Router } from '@angular/router';
import { OrdenRenderServicio } from '../shared/orden-servicio';
import { getAllContratos } from '../../contratos/store/reducers/contratos.reducers'

@Component({
  selector: 'app-orden-servicio-view',
  templateUrl: './orden-servicio-view.component.html',
  styleUrls: ['./orden-servicio-view.component.css']
})
export class OrdenServicioViewComponent implements OnInit {
  numeroContrato:string;
  ordenRenderServicio:OrdenRenderServicio;

  constructor(private router:Router,
              private store: Store<AppState>)  {

    if(this.router.getCurrentNavigation().extras.state != undefined){
        this.ordenRenderServicio = new OrdenRenderServicio;
        this.numeroContrato = this.router.getCurrentNavigation().extras.state.contrato.contNumero;
        this.ordenRenderServicio.numeroContraro = this.numeroContrato
        this.store.select(getAllContratos).subscribe((data)=>{
            if(data != null){
              let datare = Object.keys(data).map((k) => data[k])
              let res = datare.find((val) => val.numeroContrato == this.numeroContrato)
              this.ordenRenderServicio.nombreCliente = res['NombreCliente']
              this.ordenRenderServicio.numeroDocumento = res['NumeroDocumento']
              this.ordenRenderServicio.telefono = res['Telefono']
              this.ordenRenderServicio.direccion = res['Direccion']
              this.ordenRenderServicio.ZonaSector = res['ZonaSector']
              this.ordenRenderServicio.estado = this.router.getCurrentNavigation().extras.state.esso.essoDescripcion
              this.ordenRenderServicio.tipoOrden = this.router.getCurrentNavigation().extras.state.tiso.tisoDescripcion
              this.ordenRenderServicio.fechaAtencion = this.router.getCurrentNavigation().extras.state.soseFechaEjecucion
              this.ordenRenderServicio.costo = this.router.getCurrentNavigation().extras.state.sosePrecio
              this.ordenRenderServicio.observaciones ='No viene observaciones'
              this.ordenRenderServicio.tecnico ='No viene tecnico'
            }
        })
    }
 }

  ngOnInit(): void {
  }

}
