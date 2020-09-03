import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AddEmpresa } from '../store/actions/empresas.actions';
import { Empresa } from  '../shared/empresa';
import { DataListDepto , listDpto , DataListCiudad, listCiud } from '../shared/list';
import * as  fromValidation from '../../shared/validation';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map} from 'rxjs/operators';

@Component({
  selector: 'app-empresa-create',
  templateUrl: './empresa-create.component.html',
  styleUrls: ['./empresa-create.component.css']
})
export class EmpresaCreateComponent implements OnInit {

  form: FormGroup;
  empresa:Empresa = new Empresa();
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
        nit:[''],
        nombre:[''],
        direccion:[''],
        email:[''],
        telefono:[''],
        telefax:[''],
        dpto:[''],
        ciudad:['']
   })

  }

  onSaveEmpresa(){


    let d = new Date();
    const payload:Empresa = {
      emprNit: `${this.form.get('nit').value}`,
      emprNombre: `${this.form.get('nombre').value}`,
      emprDireccion: `${this.form.get('direccion').value}`,
      emprEmail:`${this.form.get('email').value}`,
      emprTelefono: `${this.form.get('telefono').value}`,
      emprTelefax: `${this.form.get('telefax').value}`,
      emprFechaInicio:`${d.toLocaleString()}`,
      emprRegistradopor: "front",
      emprFechaCreacion: `${d.toLocaleString()}`,
      emprCiudad:`${this.form.get('ciudad').value.cimuDescripcion}`,
      emprEstado: true,
      cimuId:+this.form.get('ciudad').value.cimuId
    }

    this.store.dispatch(new AddEmpresa(payload));

  }

}
