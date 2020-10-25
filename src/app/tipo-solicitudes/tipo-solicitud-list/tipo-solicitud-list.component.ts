import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TipoSolicitud } from '../shared/Tiposolicitud';
import { Observable , from } from 'rxjs';
import { tap , distinct , toArray} from 'rxjs/operators';
import  * as  tipossolicitudActions from '../store/actions/tipossolicitud.actions';
import { getAllTiposSolicitud } from '../store/reducers/tipossolicitud.reducers';

@Component({
  selector: 'app-tipo-solicitud-list',
  templateUrl: './tipo-solicitud-list.component.html',
  styleUrls: ['./tipo-solicitud-list.component.css']
})
export class TipoSolicitudListComponent implements OnInit {
  tipossolicitud: Observable<TipoSolicitud[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.tipossolicitud = this.store.select(getAllTiposSolicitud);
    this.tipossolicitud.subscribe( data =>{
          console.log(data)
    });
  }

}
