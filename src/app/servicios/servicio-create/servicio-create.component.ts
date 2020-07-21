import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AddServicio } from '../store/actions/servicios.actions';
import { Servicio } from  '../shared/servicio';
import { DataList } from '../shared/list';
import * as  fromValidation from '../../shared/validation';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map} from 'rxjs/operators';

@Component({
  selector: 'app-servicio-create',
  templateUrl: './servicio-create.component.html',
  styleUrls: ['./servicio-create.component.css']
})
export class ServicioCreateComponent implements OnInit {

  form: FormGroup;
  servicio:Servicio = new Servicio();

  constructor(
    private router:Router ,
    private store: Store<AppState>,
    private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        nombre_servicio:[''],
        descripcion_servicio:[''],
        codigo_servicio:[''],
        valor_servicio:['']
     })
    }

    onSaveServicio(){

      let d = new Date();

      const payload:Servicio={
        serNombre:`${this.form.get('nombre_servicio').value}`,
        serDescripcion: `${this.form.get('descripcion_servicio').value}`,
        serCodigo:+this.form.get('codigo_servicio').value,
        serFechaCreacion: `${d.toLocaleString()}`,
        serRegistradopor: "front",
        serActivo: true,
        serValor: +this.form.get('valor_servicio').value,
        emprId: 2
      }

      this.store.dispatch(new AddServicio(payload));

    }

}
