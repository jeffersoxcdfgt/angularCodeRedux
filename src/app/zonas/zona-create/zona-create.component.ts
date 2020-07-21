import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AddZona } from '../store/actions/zonas.actions';
import { Zona, ZonaCreate } from  '../shared/zona';
import { DataList } from '../shared/list';
import * as  fromValidation from '../../shared/validation';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map} from 'rxjs/operators';
import { DataListDepto , listDpto , DataListCiudad, listCiud } from '../shared/list';
import { isCreated } from '../store/reducers/zonas.reducers';

@Component({
  selector: 'app-zona-create',
  templateUrl: './zona-create.component.html',
  styleUrls: ['./zona-create.component.css']
})
export class ZonaCreateComponent implements OnInit {

  form: FormGroup;
  zona:Zona = new Zona();
  listCreateDpto:DataListDepto[];
  listCreateCiud:DataListCiudad[];

  constructor(
    private router:Router ,
    private store: Store<AppState>,
    private formBuilder: FormBuilder) {
      this.listCreateDpto = listDpto;
      this.listCreateCiud = listCiud;
    }

    ngOnInit(): void {
      this.form = this.formBuilder.group({
          zona_name:[''],
          descripcion:[''],
          departamento:[''],
          municipio:['']
     })
    }

    onSaveZona():void {
      let d = new Date();

      console.log(this.form.get('departamento').value)
      console.log(this.form.get('municipio').value)

      const payloadZona:ZonaCreate ={
        zonaNombre: `${this.form.get('zona_name').value}`,
        zonaDescripcion: `${this.form.get('descripcion').value}`,
        zonaRegistradopor: "front",
        zonaFechaCreacion: `${d.toLocaleString()}`,
        cimuId: +`${this.form.get('municipio').value.cimuId}`,
        zonaActivo: true,
        depDescripcion:`${this.form.get('departamento').value.depDescripcion}`,
        cimuDescripcion:`${this.form.get('municipio').value.cimuDescripcion}`
      }

      this.store.dispatch(new AddZona(payloadZona));

    }

}
