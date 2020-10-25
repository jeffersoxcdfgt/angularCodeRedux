import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Router } from '@angular/router';
import { UpdateOrdenServicio } from '../store/actions/orden-servicios.actions';
import { OrdenRenderServicio ,OrdenServicioUpdate , OrdenServicioUpdateResp } from  '../shared/orden-servicio';
import { getAllContratos ,  isUpdated} from '../../contratos/store/reducers/contratos.reducers';

@Component({
  selector: 'app-orden-servicio-delete',
  templateUrl: './orden-servicio-delete.component.html',
  styleUrls: ['./orden-servicio-delete.component.css']
})
export class OrdenServicioDeleteComponent implements OnInit {
  numeroContrato:string;
  ordenRenderServicio:OrdenRenderServicio;

  estado:string;

  constructor(private router:Router,
              private store: Store<AppState>)  {

    if(this.router.getCurrentNavigation().extras.state != undefined){

        console.log(this.router.getCurrentNavigation().extras.state)

        this.ordenRenderServicio = new OrdenRenderServicio;
        this.numeroContrato = this.router.getCurrentNavigation().extras.state.contrato.contNumero;
        this.ordenRenderServicio.numeroContrato = this.numeroContrato
        this.store.select(getAllContratos).subscribe((data)=>{
            if(data != null){
              let datare = Object.keys(data).map((k) => data[k])
              let res = datare.find((val) => val.numeroContrato == this.numeroContrato)
              this.ordenRenderServicio.nombreCliente = res['NombreCliente']
              this.ordenRenderServicio.numeroDocumento = res['NumeroDocumento']
              this.ordenRenderServicio.telefono = res['Telefono']
              this.ordenRenderServicio.direccion = res['Direccion']
              this.ordenRenderServicio.ZonaSector = res['ZonaSector']

              if(this.router.getCurrentNavigation() != null){
                  this.ordenRenderServicio.estado = this.router.getCurrentNavigation().extras.state.esso.essoDescripcion
                  this.ordenRenderServicio.tipoOrden = this.router.getCurrentNavigation().extras.state.tiso.tisoDescripcion
                  this.ordenRenderServicio.fechaAtencion = this.router.getCurrentNavigation().extras.state.soseFechaEjecucion
                  this.ordenRenderServicio.costo = this.router.getCurrentNavigation().extras.state.sosePrecio
                  this.ordenRenderServicio.observaciones ='No viene observaciones'
                  this.ordenRenderServicio.tecnico ='No viene tecnico'
              }
            }
        })
    }
 }

  ngOnInit(): void {
  }

  OnUpdateOrdenServicio() {
    const payload:OrdenServicioUpdate =  {
      soseId: 153,
      essoId: 3,
      soseDescripcion: "orden de instalacion",
      soseFechaEjecucion: "2020-09-26",
      soseRegistradopor: "cajero123",
      sosePrecio: 0,
      soseResponsable: "string",
      tisoId: 17 //Suspensiond de la Orden
    }
    this.store.dispatch(new UpdateOrdenServicio(payload))
    this.store.select(isUpdated).subscribe((data) => {
      if(data!=null){
        //console.log("Edit")
        //console.log(data)
        this.router.navigate(['/ordenesservicios/detail',this.numeroContrato]);
      }
    });
  }

}
