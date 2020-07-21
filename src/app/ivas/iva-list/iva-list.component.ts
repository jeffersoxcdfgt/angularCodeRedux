import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Iva } from '../shared/iva';
import { Observable , from } from 'rxjs';
import  * as  ivasActions from '../store/actions/ivas.actions';
import { getAllIvas } from '../store/reducers/ivas.reducers';
import {NgxPaginationModule} from 'ngx-pagination';
import swal from 'sweetalert2';

@Component({
  selector: 'app-iva-list',
  templateUrl: './iva-list.component.html',
  styleUrls: ['./iva-list.component.css']
})
export class IvaListComponent implements OnInit {
  ivas : Observable<Iva[]>;
  p: number = 1;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.ivas = this.store.select(getAllIvas);
    this.ivas.subscribe( data =>{
          console.log(data)
    });
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
          this.store.dispatch(new ivasActions.DeleteIva(id));
          swal.fire(
            'Borrado!',
            'Su registro ha sido borrado.',
            'success'
          )
        }
      })

  }

}
