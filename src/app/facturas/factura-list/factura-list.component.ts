import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Contrato , ContratoRender } from '../../contratos/shared/contrato';
import { Observable , from , BehaviorSubject , of } from 'rxjs';
import { map } from 'rxjs/operators';

import  * as  contratosActions from '../../contratos/store/actions/contratos.actions';
import { getAllContratos } from '../../contratos/store/reducers/contratos.reducers';
import {NgxPaginationModule} from 'ngx-pagination';
import swal from 'sweetalert2';
import { GetAllContratos } from '../../contratos/store/actions/contratos.actions';
import { getAllHeadersFactura } from '../store/reducers/facturas.reducers';

@Component({
  selector: 'app-factura-list',
  templateUrl: './factura-list.component.html',
  styleUrls: ['./factura-list.component.css']
})
export class FacturaListComponent implements OnInit {

  contratos : Contrato[];
  p: number = 1;

  MensualidadesMesactual:string = ''
  valueMesActual:string = ''

  MensualidadesPendientesMesactual:string = ''
  valueMesActualPendiente:string = ''

  MensualidadesMesanterior:string = ''
  valueMesAnteriorPendiente:string = ''

  ValueMensualidadesAdelantadas:string= ''


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.select(getAllHeadersFactura).subscribe((data) => {
          if(data != null){
            this.valueMesActual = data['pagadasMesActual']
            this.MensualidadesMesactual = `Mensualidades Pagadas ${data['mesActual']}`

            this.valueMesActualPendiente = data['pendientesMesActual']
            this.MensualidadesPendientesMesactual = `Mensualidades Pendientes ${data['mesActual']}`


            this.valueMesAnteriorPendiente = data['pendientesMesAnterior']
            this.MensualidadesMesanterior = `Mensualidades Pendientes ${data['mesAnterior']}`

            this.ValueMensualidadesAdelantadas =  `${data['adelantadas']}`
        }
    });

    this.store.dispatch(new GetAllContratos())
    this.store.select(getAllContratos).subscribe((data)=>{
        if(data != null){
          this.contratos = data
        }
    })

  }
}
