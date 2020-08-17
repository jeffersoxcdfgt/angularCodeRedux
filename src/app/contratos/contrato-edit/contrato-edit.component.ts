import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { GetContrato , UpdateContrato } from '../store/actions/contratos.actions';
import { getContrato } from '../store/reducers/contratos.reducers';
import { Contrato } from '../shared/contrato';
import * as  fromValidation from '../../shared/validation';
import { DataList } from '../shared/list';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map} from 'rxjs/operators';
const FIRSTELEMENT =0

@Component({
  selector: 'app-contrato-edit',
  templateUrl: './contrato-edit.component.html',
  styleUrls: ['./contrato-edit.component.css']
})
export class ContratoEditComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private store:Store<AppState>,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe( params =>{
        this.store.dispatch(new GetContrato(params['id']))
    })

    this.store.select(getContrato).subscribe((contrato:Contrato) => {
        if(contrato != null){
            contrato=contrato[FIRSTELEMENT]
            console.log(contrato)
        }
    });

  }

}
