import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AddRol } from '../store/actions/roles.actions';
import { Rol } from  '../shared/rol';
import { DataList } from '../shared/list';
import * as  fromValidation from '../../shared/validation';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map} from 'rxjs/operators';
import { ValidationRolService } from '../../shared/validations/validationRol.service';

@Component({
  selector: 'app-rol-create',
  templateUrl: './rol-create.component.html',
  styleUrls: ['./rol-create.component.css']
})
export class RolCreateComponent implements OnInit {

  form: FormGroup;
  rol:Rol = new Rol();

  constructor(
    private router:Router ,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    public validationService:ValidationRolService) { }

  ngOnInit(): void {
    this.validationService.initValidation();
    this.form = this.formBuilder.group({
        rol_name:[''],
        rol_desc:['']
   })
  }

  onSaveRol(){
    if(this.validationService.ifGood()){
        let d = new Date();
        const payload:Rol = {
          rolNombre:`${this.form.get('rol_name').value}`,
          rolDescripcion:`${this.form.get('rol_desc').value}`,
          rolEstado: true,
          rolRegistradopor: "front",
          rolFechaCreacion: `${d.toLocaleString()}`
        }

        this.store.dispatch(new AddRol(payload));
    }
  }

}
