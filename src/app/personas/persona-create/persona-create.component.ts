import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AddPersona } from '../store/actions/personas.actions';
import { Persona } from  '../shared/persona';
import { DataList, listTipoDocumento, listTipoPersona , listTipoSexo , listEstadoCivil } from '../shared/list';
import * as  fromValidation from '../../shared/validation';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map} from 'rxjs/operators';


@Component({
  selector: 'app-persona-create',
  templateUrl: './persona-create.component.html',
  styleUrls: ['./persona-create.component.css']
})
export class PersonaCreateComponent implements OnInit {

  form: FormGroup;
  persona:Persona = new Persona();

  listTipoDocumento:DataList[];
  listTipoPersona:DataList[];
  listTipoSexo:DataList[];
  listTipoEstadoCivil:DataList[];

  constructor(
    private router:Router ,
    private store: Store<AppState>,
    private formBuilder: FormBuilder) {
      this.listTipoDocumento = listTipoDocumento;
      this.listTipoPersona = listTipoPersona
      this.listTipoSexo = listTipoSexo
      this.listTipoEstadoCivil = listEstadoCivil
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        tipo_documento:[{ id: 1, value: 'CC'}],
        numero_documento:[''],
        nombres:[''],
        apellidos:[''],
        email:[''],
        tipo_persona:[{ id: 1, value: 'Juridica'}],
        sexo:[{ id: 1, value: 'Hombre'}],
        estado_civil:[{ id: 1, value: 'Soltero(a)'}],
        fecha_nacimiento:[''],
        direccion:[''],
        telefono:[''],
        celular:[''],
        usuario:[''],
        empresa:['']
   })

  }

  onSavePersona(){
    let d = new Date();

    const payload:Persona = {
      persId: `${this.form.get('usuario').value}`,
      esciId: this.form.get('estado_civil').value.id,
      persIscontribuyente: true,
      persNombre: `${this.form.get('nombres').value}`,
      persApellido:`${this.form.get('apellidos').value}`,
      persFechanacimiento: `${this.form.get('fecha_nacimiento').value}`,
      persDireccion: `${this.form.get('direccion').value}`,
      persTelefono:`${this.form.get('telefono').value}`,
      persCelular:`${this.form.get('celular').value}`,
      persEmail: `${this.form.get('email').value}`,
      persLogin: `${this.form.get('usuario').value}`,
      persPassword: "1234567",
      persRegistradopor: "front",
      persFechaCreacion: `${d.toLocaleString()}`,
      persActivo: true,
      clclId: 2,
      tidoId:+this.form.get('tipo_documento').value.id,
      tipeId: +this.form.get('tipo_persona').value.id,
      sexId:+this.form.get('sexo').value.id,
      persNumDocumento: `${this.form.get('numero_documento').value}`
    }

    this.store.dispatch(new AddPersona(payload));

  }

}
