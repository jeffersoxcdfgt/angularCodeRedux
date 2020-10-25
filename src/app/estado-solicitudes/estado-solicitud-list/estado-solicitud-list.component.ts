import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { EstadoSolicitud } from '../shared/EstadoSolicitud';
import { Observable , from } from 'rxjs';
import { tap , distinct , toArray} from 'rxjs/operators';
import  * as  estadossolicitudActions from '../store/actions/estadosolicitud.actions';
import { getAllEstadosSolicitud } from '../store/reducers/estadosolicitud.reducers';


@Component({
  selector: 'app-estado-solicitud-list',
  templateUrl: './estado-solicitud-list.component.html',
  styleUrls: ['./estado-solicitud-list.component.css']
})
export class EstadoSolicitudListComponent implements OnInit {
  estadosssolicitud: Observable<EstadoSolicitud[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.estadosssolicitud = this.store.select(getAllEstadosSolicitud);
    this.estadosssolicitud.subscribe( data =>{
          console.log(data)
    });
  }

}
