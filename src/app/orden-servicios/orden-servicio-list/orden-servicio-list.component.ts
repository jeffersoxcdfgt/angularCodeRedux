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

@Component({
  selector: 'app-orden-servicio-list',
  templateUrl: './orden-servicio-list.component.html',
  styleUrls: ['./orden-servicio-list.component.css']
})
export class OrdenServicioListComponent implements OnInit {

  contratos : Contrato[];
  p: number = 1;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new GetAllContratos())
    this.store.select(getAllContratos).subscribe((data)=>{
        if(data != null){
          console.log(data)
          this.contratos = data
        }
    })
  }

}
