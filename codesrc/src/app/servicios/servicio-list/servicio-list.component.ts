import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Servicio } from '../shared/servicio';
import { Observable , from } from 'rxjs';
import  * as  serviciosActions from '../store/actions/servicios.actions';
import { getAllServicios } from '../store/reducers/servicios.reducers';
import {NgxPaginationModule} from 'ngx-pagination';
import swal from 'sweetalert2';

@Component({
  selector: 'app-servicio-list',
  templateUrl: './servicio-list.component.html',
  styleUrls: ['./servicio-list.component.css']
})
export class ServicioListComponent implements OnInit {
  servicios : Observable<Servicio[]>;
  p: number = 1;
  order:any;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.servicios = this.store.select(getAllServicios);
    this.servicios.subscribe( data =>{
          console.log(data)
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
          this.store.dispatch(new serviciosActions.DeleteServicio(id));
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
