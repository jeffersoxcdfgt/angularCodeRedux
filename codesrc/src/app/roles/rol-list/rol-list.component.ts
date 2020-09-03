import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Rol } from '../shared/rol';
import { Observable , from } from 'rxjs';
import  * as  rolesActions from '../store/actions/roles.actions';
import { getAllRoles } from '../store/reducers/roles.reducers';
import {NgxPaginationModule} from 'ngx-pagination';
import swal from 'sweetalert2';

@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.css']
})
export class RolListComponent implements OnInit {
  roles : Observable<Rol[]>;
  p: number = 1;

  constructor(private store: Store<AppState>) { }

  ngOnInit(){
    this.store.dispatch(new rolesActions.GetAllRoles());
    this.roles = this.store.select(getAllRoles);
    /*this.roles.subscribe( data =>{
            console.log(data)
    });*/
  }

  /**
   * Delete the selected rol
   * @param {number} id the rol id
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
          this.store.dispatch(new rolesActions.DeleteRol(id));
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
