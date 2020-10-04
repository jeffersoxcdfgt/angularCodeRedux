import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Contrato , ContratoRender } from '../shared/contrato';
import { Observable , from , BehaviorSubject , of } from 'rxjs';
import { map } from 'rxjs/operators';

import  * as  contratosActions from '../store/actions/contratos.actions';
import { getAllContratos } from '../store/reducers/contratos.reducers';
import {NgxPaginationModule} from 'ngx-pagination';
import swal from 'sweetalert2';
import { GetAllContratos } from '../store/actions/contratos.actions';

@Component({
  selector: 'app-contrato-list',
  templateUrl: './contrato-list.component.html',
  styleUrls: ['./contrato-list.component.css']
})
export class ContratoListComponent implements OnInit {
  contratos : Observable<Contrato[]>;
  contratosRender :Contrato[] = [];
  contratosRenderAux :Contrato[] = [];
  listContratos : Contrato[];
  p: number = 1;
  order:any;

  subSearch:BehaviorSubject<string> =  new BehaviorSubject<string>('');
  obSearch:Observable<string> =  of('');

  returnAll= map((str:string) => {
      if(!str){
        return "All"
      }

      if(str){
        return str
      }
  })

  constructor(private store: Store<AppState>) {
    this.obSearch =  this.subSearch.pipe(this.returnAll)
    this.obSearch.subscribe((data)=>{
        if(data == 'All'){
          this.contratosRender = this.contratosRenderAux
        }
        else{
          this.contratosRender = this.contratosRender.filter((val:Contrato) => {
            return new RegExp(data,'i').test(val.numeroContrato) ||
                    new RegExp(data,'i').test(val.CedulaNombre)
          })
        }
    })
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllContratos())
    this.contratos = this.store.select(getAllContratos);
    this.contratos.subscribe( data =>{
       this.listContratos = data
       this.contratosRender =  data
       this.contratosRenderAux = data

    });
  }

  /**
   * Delete the selected contrato
   * @param {number} id the contrato id
   */
  delete(id: string) {
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
