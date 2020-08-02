import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Departamento } from '../shared/departamento';
import { Observable , from } from 'rxjs';
import { tap , distinct , toArray} from 'rxjs/operators';
import  * as  departamentosActions from '../store/actions/departamentos.actions';
import { getAllDepartamentos } from '../store/reducers/departamentos.reducers';

@Component({
  selector: 'app-departamento-list',
  templateUrl: './departamento-list.component.html',
  styleUrls: ['./departamento-list.component.css']
})
export class DepartamentoListComponent implements OnInit {
  title = 'Lista de departamentos';
  departamentos : Observable<Departamento[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.departamentos = this.store.select(getAllDepartamentos);
    this.departamentos.subscribe( data =>{
          console.log(data)
    });

  }

}
