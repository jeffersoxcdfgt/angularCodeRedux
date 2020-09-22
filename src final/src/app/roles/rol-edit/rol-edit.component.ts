import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { GetRol , UpdateRol } from '../store/actions/roles.actions';
import { getRol } from '../store/reducers/roles.reducers';
import {  Rol } from '../shared/rol';
import * as  fromValidation from '../../shared/validation';
import { DataList } from '../shared/list';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map} from 'rxjs/operators';
import { ValidationRolService } from '../../shared/validations/validationRol.service';
const FIRSTELEMENT =0

@Component({
  selector: 'app-rol-edit',
  templateUrl: './rol-edit.component.html',
  styleUrls: ['./rol-edit.component.css']
})
export class RolEditComponent implements OnInit {
   form: FormGroup;
   rol:Rol = new Rol();
   id:number=0;

   constructor(
     private route:ActivatedRoute,
     private store:Store<AppState>,
     private formBuilder: FormBuilder,
     public validationService:ValidationRolService)
   { }

   ngOnInit(): void {
     this.validationService.initValidation();
     this.form = this.formBuilder.group({
         rol_name:[''],
         rol_desc:['']
    })

    this.route.params.subscribe( params =>{
        this.store.dispatch(new GetRol(+params['id']))
    })

    this.store.select(getRol).subscribe((rol:Rol) => {
        if(rol != null){
          rol =rol[FIRSTELEMENT]
          this.id = rol.rolId
          this.form.get('rol_name').setValue(rol.rolNombre)
          this.validationService.subNombreRol.next(rol.rolNombre);

          this.form.get('rol_desc').setValue(rol.rolDescripcion)
          this.validationService.subDescripcionRol.next(rol.rolDescripcion);
       }
    });

   }

   onSaveRol(){
     if(this.validationService.ifGood()){
     let d = new Date();
      const payload:Rol ={
        rolId:+this.id,
        rolNombre:`${this.form.get('rol_name').value}`,
        rolDescripcion:`${this.form.get('rol_desc').value}`,
        rolEstado: true,
        rolRegistradopor: "front",
        rolFechaCreacion: `${d.toLocaleString()}`
      }
      this.store.dispatch(new UpdateRol(payload));
    }
   }

}
