import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Empresa } from '../shared/empresa';
import { Observable , from , BehaviorSubject , of } from 'rxjs';
import { map } from 'rxjs/operators';

import  * as  empresasActions from '../store/actions/empresas.actions';
import { getAllEmpresas } from '../store/reducers/empresas.reducers';
import {NgxPaginationModule} from 'ngx-pagination';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {
  empresas : Observable<Empresa[]>;
  empresasRender :Empresa[] = [];
  empresasRenderAux :Empresa[] = [];
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
          this.empresasRender = this.empresasRenderAux
        }
        else{
          this.empresasRender = this.empresasRender.filter((val:Empresa) => {
            return new RegExp(data,'i').test(val.emprNit) ||
                    new RegExp(data,'i').test(val.emprNombre)
          })
        }
    })
  }

  ngOnInit(): void {
    this.empresas = this.store.select(getAllEmpresas);
    this.empresas.subscribe( data =>{
        this.empresasRender =  data
        this.empresasRenderAux = data
    });
  }

  /**
   * Delete the selected zona
   * @param {number} id the zona id
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
          this.store.dispatch(new empresasActions.DeleteEmpresa(id));
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
