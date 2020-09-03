import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Sector } from '../shared/sector';
import { Observable , from } from 'rxjs';
import  * as  sectoresActions from '../store/actions/sectores.actions';
import { getAllSectores } from '../store/reducers/sectores.reducers';
import {NgxPaginationModule} from 'ngx-pagination';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.css']
})
export class SectorListComponent implements OnInit {
  sectores : Observable<Sector[]>;
  p: number = 1;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
      this.sectores = this.store.select(getAllSectores);
      /*this.sectores.subscribe( data =>{
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
          this.store.dispatch(new sectoresActions.DeleteSector(id));
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
