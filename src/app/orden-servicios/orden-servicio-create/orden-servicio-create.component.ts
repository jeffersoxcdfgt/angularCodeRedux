import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AddOrdenServicio } from '../store/actions/orden-servicios.actions';
import { OrdenServicioAdd , OrdenRenderServicio } from  '../shared/orden-servicio';
import { isCreated } from '../store/reducers/orden-servicios.reducers';


@Component({
  selector: 'app-orden-servicio-create',
  templateUrl: './orden-servicio-create.component.html',
  styleUrls: ['./orden-servicio-create.component.css']
})
export class OrdenServicioCreateComponent implements OnInit {
  numeroContrato:string;
  ordenRenderServicio:OrdenRenderServicio;

  constructor(private router:Router,
              private store: Store<AppState>)  {

    if(this.router.getCurrentNavigation().extras.state != undefined){
        this.ordenRenderServicio = new OrdenRenderServicio
        this.numeroContrato = this.router.getCurrentNavigation().extras.state.numeroContrato
        this.ordenRenderServicio.nombreCliente = this.router.getCurrentNavigation().extras.state.nombreCliente
        this.ordenRenderServicio.numeroDocumento = this.router.getCurrentNavigation().extras.state.numeroDocumento
        this.ordenRenderServicio.telefono = this.router.getCurrentNavigation().extras.state.telefono
        this.ordenRenderServicio.direccion = this.router.getCurrentNavigation().extras.state.direccion
        this.ordenRenderServicio.ZonaSector =this.router.getCurrentNavigation().extras.state.ZonaSector
    }
 }

  ngOnInit(): void {
  }

  OnAddOrdenServicio() {
      const payload:OrdenServicioAdd =  {
      essoId: 3,
      soseDescripcion: "orden de instalacion",
      soseFechaEjecucion: "2020-09-26",
      soseRegistradopor: "cajero123",
      sosePrecio: 0,
      soseResponsable: "string",
      tisoId: 14,
      Factura : {
          FopaId : 12,
          FactIva : 19,
          FactBase : 45000,
          SerId : 84,
          FactCodigoPago : null,
          FactConcepto : "pago de solicitud",
          persId: "asilva15085",
          MesId : 10
      }
    }

    this.store.dispatch(new AddOrdenServicio(payload))
    this.store.select(isCreated).subscribe((data) => {
        if(data!=null){
          //console.log("Add")
          //console.log(data)
          this.router.navigate(['/ordenesservicios/detail',this.numeroContrato]);
        }
    });
  }
}
