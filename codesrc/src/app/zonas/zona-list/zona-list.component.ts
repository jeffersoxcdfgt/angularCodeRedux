import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Zona } from '../shared/zona';
import { Observable , from } from 'rxjs';
import  * as  zonasActions from '../store/actions/zonas.actions';
import { getAllZonas } from '../store/reducers/zonas.reducers';
import {NgxPaginationModule} from 'ngx-pagination';
import swal from 'sweetalert2';


@Component({
  selector: 'app-zona-list',
  templateUrl: './zona-list.component.html',
  styleUrls: ['./zona-list.component.css']
})
export class ZonaListComponent implements OnInit {
  zonas : Observable<Zona[]>;
  p: number = 1;
  order:any;

  constructor(private store: Store<AppState>) { }

  ngOnInit(){

    this.zonas = this.store.select(getAllZonas);
    /**this.zonas.subscribe( data =>{
          console.log(data)
    });*/



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
          this.store.dispatch(new zonasActions.DeleteZona(id));
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
