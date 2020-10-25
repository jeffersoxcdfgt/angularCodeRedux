import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { UpdateOrdenServicio } from '../store/actions/orden-servicios.actions';
import { OrdenServicioUpdate , OrdenServicioUpdateResp } from  '../shared/orden-servicio';
import { isUpdated } from '../store/reducers/orden-servicios.reducers';

@Component({
  selector: 'app-orden-servicio-edit',
  templateUrl: './orden-servicio-edit.component.html',
  styleUrls: ['./orden-servicio-edit.component.css']
})
export class OrdenServicioEditComponent implements OnInit {
  numeroContrato:string;

  constructor(
    private router:Router,
    private store: Store<AppState>
  ) {

    if(this.router.getCurrentNavigation().extras.state != undefined){
      this.numeroContrato = this.router.getCurrentNavigation().extras.state.contrato.contNumero
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
      tisoId: 14
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
