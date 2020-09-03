import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Municipio } from '../shared/municipio';
import { Observable , from } from 'rxjs';
import { tap , distinct , toArray} from 'rxjs/operators';
import  * as  municipiosActions from '../store/actions/municipios.actions';
import { getAllMunicipios } from '../store/reducers/municipios.reducers';

@Component({
  selector: 'app-municipio-list',
  templateUrl: './municipio-list.component.html',
  styleUrls: ['./municipio-list.component.css']
})
export class MunicipioListComponent implements OnInit {

  title = 'Lista de municipios';
  municipios : Observable<Municipio[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.municipios = this.store.select(getAllMunicipios);
    this.municipios.subscribe( data =>{
          console.log(data)
    });
  }

}
