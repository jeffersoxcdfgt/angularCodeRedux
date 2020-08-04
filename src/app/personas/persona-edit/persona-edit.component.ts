import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { GetPersona , UpdatePersona } from '../store/actions/personas.actions';
import { getPersona } from '../store/reducers/personas.reducers';
import { Persona } from '../shared/persona';
import * as  fromValidation from '../../shared/validation';
import { DataList, listTipoDocumento, listTipoPersona , listTipoSexo , listEstadoCivil , listTipoRol , listTipoEmpresa } from '../shared/list';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map} from 'rxjs/operators';

import { Rol } from '../../roles/shared/rol';
import  * as  rolesActions from '../../roles/store/actions/roles.actions';
import { getAllRoles } from '../../roles/store/reducers/roles.reducers';
import { Empresa } from '../../empresas/shared/empresa';
import  * as  empresasActions from '../../empresas/store/actions/empresas.actions';
import { getAllEmpresas } from '../../empresas/store/reducers/empresas.reducers';

const FIRSTELEMENT =0

@Component({
  selector: 'app-persona-edit',
  templateUrl: './persona-edit.component.html',
  styleUrls: ['./persona-edit.component.css']
})
export class PersonaEditComponent implements OnInit {

  form: FormGroup;
  persona:Persona = new Persona();
  roles : Observable<Rol[]>;
  empresas : Observable<Empresa[]>;
  id:number=0;

  listTipoDocumento:DataList[];
  listTipoPersona:DataList[];
  listTipoSexo:DataList[];
  listTipoEstadoCivil:DataList[];
  listTipoRol:DataList[];
  listTipoEmpresa:DataList[];
  persId:string;

  constructor(
    private route:ActivatedRoute,
    private store:Store<AppState>,
    private formBuilder: FormBuilder){
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
        tipo_persona:[{ id: 1, value: 'Juridica'}],
        sexo:[{ id: 1, value: 'Hombre'}],
        estado_civil:[{ id: 1, value: 'Soltero(a)'}],
        fecha_nacimiento:[''],
        direccion:[''],
        telefono:[''],
        celular:[''],
        usuario:[''],
        empresa:[''],
        password:[''],
        rol:[]
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

   this.route.params.subscribe( params =>{
       this.store.dispatch(new GetPersona(+params['id']))
   })

   this.store.select(getPersona).subscribe((persona:Persona) => {
       if(persona != null){
         persona =persona[FIRSTELEMENT]
         this.persId = persona.persId;

         let resCivil =  this.listTipoEstadoCivil.find((val) => val.id== persona.esciId )
         this.form.get('estado_civil').setValue(resCivil)

         this.form.get('nombres').setValue(persona.persNombre)
         this.form.get('apellidos').setValue(persona.persApellido)

         let date = new Date(persona.persFechanacimiento);
         let year = date.getFullYear();
         let month = ("00"+(date.getMonth()+1)).slice(-2);
         let day = ("00"+date.getDate()).slice(-2);
         let fecha_nacimiento =  `${year}-${month}-${day}`
         this.form.get('fecha_nacimiento').setValue(fecha_nacimiento)

         this.form.get('direccion').setValue(persona.persDireccion)
         this.form.get('telefono').setValue(persona.persTelefono)
         this.form.get('celular').setValue(persona.persCelular)

         let resTipoDoc =  this.listTipoDocumento.find((val) => val.id== persona.tidoId )
         this.form.get('tipo_documento').setValue(resTipoDoc)

         let resTipoPeR =  this.listTipoPersona.find((val) => val.id== persona.tipeId )
         this.form.get('tipo_persona').setValue(resTipoPeR)

         let resTipoSexo =  this.listTipoSexo.find((val) => val.id== persona.sexId )
         this.form.get('sexo').setValue(resTipoSexo)

         this.form.get('email').setValue(persona.persEmail)
         this.form.get('numero_documento').setValue(persona.persNumDocumento)
         this.form.get('usuario').setValue(persona.persId)
      }
   });
  }

  onSavePersona(){

    let d = new Date();
    const payload:Persona={
      persId:`${this.persId}`,
      esciId:+this.form.get('estado_civil').value.id,
      persIscontribuyente: true,
      persNombre: `${this.form.get('nombres').value}`,
      persApellido:  `${this.form.get('apellidos').value}`,
      persFechanacimiento: `${this.form.get('fecha_nacimiento').value}`,
      persDireccion: `${this.form.get('direccion').value}`,
      persTelefono:  `${this.form.get('telefono').value}`,
      persCelular:`${this.form.get('celular').value}`,
      persEmail: `${this.form.get('email').value}`,
      persLogin: `${this.form.get('email').value}`,
      persPassword: "123",
      persRegistradopor: "front ax",
      persFechaCreacion: `${d.toLocaleString()}`,
      persActivo: true,
      clclId: 1,
      tidoId:+this.form.get('tipo_documento').value.id,
      tipeId:+this.form.get('tipo_persona').value.id,
      sexId: +this.form.get('sexo').value.id,
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

    this.store.dispatch(new UpdatePersona(payload));

  }

}
