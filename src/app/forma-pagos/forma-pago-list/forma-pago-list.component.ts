import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FormaPago } from '../shared/formaPago';
import { Observable , from } from 'rxjs';
import { tap , distinct , toArray} from 'rxjs/operators';
import  * as  formaPagosActions from '../store/actions/formaPagos.actions';
import { getAllFormaPagos } from '../store/reducers/formaPagos.reducers';

@Component({
  selector: 'app-forma-pago-list',
  templateUrl: './forma-pago-list.component.html',
  styleUrls: ['./forma-pago-list.component.css']
})
export class FormaPagoListComponent implements OnInit {
  formaPagos : Observable<FormaPago[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.formaPagos = this.store.select(getAllFormaPagos);
    this.formaPagos.subscribe( data =>{
          console.log(data)
      }
    );
  }


}
