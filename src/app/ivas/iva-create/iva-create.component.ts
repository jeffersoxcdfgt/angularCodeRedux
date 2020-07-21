import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AddIva } from '../store/actions/ivas.actions';
import { Iva } from  '../shared/iva';
import { DataList } from '../shared/list';
import * as  fromValidation from '../../shared/validation';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map} from 'rxjs/operators';

@Component({
  selector: 'app-iva-create',
  templateUrl: './iva-create.component.html',
  styleUrls: ['./iva-create.component.css']
})
export class IvaCreateComponent implements OnInit {

  form: FormGroup;
  iva:Iva = new Iva();

  constructor(
    private router:Router ,
    private store: Store<AppState>,
    private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.form = this.formBuilder.group({
          iva_name:[''],
          valor:[''],
          descripcion:['']
     })
    }

    onSaveIva(){
      let d = new Date();
      const payload:Iva = {
        ivaNombre: `${this.form.get('iva_name').value}`,
        ivaDescripcion:`${this.form.get('descripcion').value}`,
        ivaRegistradopor: "front",
        ivaFechaCreacion: `${d.toLocaleString()}`,
        ivaValor:+this.form.get('valor').value,
        ivaActivo: true
       }
       this.store.dispatch(new AddIva(payload));

    }

}
