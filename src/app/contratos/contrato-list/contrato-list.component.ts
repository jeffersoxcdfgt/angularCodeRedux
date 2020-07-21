import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Contrato } from '../shared/contrato';
import { Observable , from } from 'rxjs';
import  * as  contratosActions from '../store/actions/contratos.actions';
import { getAllContratos } from '../store/reducers/contratos.reducers';
import {NgxPaginationModule} from 'ngx-pagination';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contrato-list',
  templateUrl: './contrato-list.component.html',
  styleUrls: ['./contrato-list.component.css']
})
export class ContratoListComponent implements OnInit {
  contratos : Observable<Contrato[]>;
  p: number = 1;
  order:any;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.contratos = this.store.select(getAllContratos);
    this.contratos.subscribe( data =>{
          console.log(data)
    });
  }

  /**
   * Delete the selected contrato
   * @param {number} id the contrato id
   */
  delete(id: number) {

    swal.fire({
        title: 'Esta seguro?',
        text: "No podra reversar esta Acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, desea borrarlo!'
      }).then((result) => {
        if (result.value) {
          this.store.dispatch(new contratosActions.DeleteContrato(id));
          swal.fire(
            'Borrado!',
            'Su registro ha sido borrado.',
            'success'
          )
        }
      })
  }

  refresh():void {
    window.location.reload()
  }

}
