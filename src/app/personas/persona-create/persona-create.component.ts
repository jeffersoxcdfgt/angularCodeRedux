import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AddPersona } from '../store/actions/personas.actions';
import { Persona } from  '../shared/persona';
import { DataList, listTipoDocumento, listTipoPersona , listTipoSexo , listEstadoCivil , listTipoRol , listTipoEmpresa} from '../shared/list';
import * as  fromValidation from '../../shared/validation';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map} from 'rxjs/operators';
import { Rol } from '../../roles/shared/rol';
import  * as  rolesActions from '../../roles/store/actions/roles.actions';
import { getAllRoles } from '../../roles/store/reducers/roles.reducers';
import { Empresa } from '../../empresas/shared/empresa';
import  * as  empresasActions from '../../empresas/store/actions/empresas.actions';
import { getAllEmpresas } from '../../empresas/store/reducers/empresas.reducers';


@Component({
  selector: 'app-persona-create',
  templateUrl: './persona-create.component.html',
  styleUrls: ['./persona-create.component.css']
})
export class PersonaCreateComponent implements OnInit {

  form: FormGroup;
  persona:Persona = new Persona();
  roles : Observable<Rol[]>;
  empresas : Observable<Empresa[]>;

  listTipoDocumento:DataList[];
  listTipoPersona:DataList[];
  listTipoSexo:DataList[];
  listTipoEstadoCivil:DataList[];
  listTipoRol:DataList[];
  listTipoEmpresa:DataList[];

  constructor(
    private router:Router ,
    private store: Store<AppState>,
    private formBuilder: FormBuilder) {
      this.listTipoDocumento = listTipoDocumento;
      this.listTipoPersona = listTipoPersona
      this.listTipoSexo = listTipoSexo
      this.listTipoEstadoCivil = listEstadoCivil
      this.listTipoRol= listTipoRol
      this.listTipoEmpresa = listTipoEmpresa
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        tipo_documento:[{ id: 1, value: 'CC'}],
        numero_documento:[''],
        nombres:[''],
        apellidos:[''],
        email:[''],
        tipo_persona:[{ id: 2, value: 'Natural'}],
        sexo:[{ id: 1, value: 'Hombre'}],
        estado_civil:[{ id: 1, value: 'Soltero(a)'}],
        fecha_nacimiento:[''],
        direccion:[''],
        telefono:[''],
        celular:[''],
        usuario:[''],
        empresa:[''],
        password:[''],
        rol:[],
   })

   this.empresas = this.store.select(getAllEmpresas);
   this.empresas.subscribe( data =>{
       this.listTipoEmpresa = data.map((val:Empresa)=>{
        return {
          id:val.emprId,
          value: `${val.emprNombre}`
        }
      })
   });

    this.roles = this.store.select(getAllRoles);
    this.roles.subscribe( data =>{
      this.listTipoRol = data.map((val:Rol)=>{
         return {
             id:val.rolId,
             value: `${val.rolNombre}`
         }
       })
     });
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
      persNumDocumento: `${this.form.get('numero_documento').value}`,
      personaRol:
         this.form.get('rol').value != null ? this.form.get('rol').value.map((val:Rol)=>{
            return {
                persId:`${this.form.get('usuario').value}`,
                rolId:val['id'],
                peroEstado:true,
                peroRegistradopor:"string",
                peroFechaCreacion:`${new Date().toLocaleString()}`
            }
        }):[]
    }

    this.store.dispatch(new AddPersona(payload));
  }

}
