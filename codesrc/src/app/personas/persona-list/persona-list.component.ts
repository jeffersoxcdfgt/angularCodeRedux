import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Persona } from '../shared/persona';
import { Observable , from } from 'rxjs';
import  * as  personasActions from '../store/actions/personas.actions';
import { getAllPersonas } from '../store/reducers/personas.reducers';
import {NgxPaginationModule} from 'ngx-pagination';
import swal from 'sweetalert2';


@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent implements OnInit {
  personas : Observable<Persona[]>;
  p: number = 1;
  order:any;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.personas = this.store.select(getAllPersonas);
    /*this.personas.subscribe( data =>{
          console.log(data)
    });*/


  }
  /**
   * Delete the selected persona
   * @param {number} id the persona id
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
          this.store.dispatch(new personasActions.DeletePersona(id));
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
