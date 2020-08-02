import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { GetServicio , UpdateServicio } from '../store/actions/servicios.actions';
import { getServicio } from '../store/reducers/servicios.reducers';
import {  Servicio } from '../shared/servicio';
import * as  fromValidation from '../../shared/validation';
import { DataList } from '../shared/list';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map } from 'rxjs/operators';
const FIRSTZONA=0

@Component({
  selector: 'app-servicio-edit',
  templateUrl: './servicio-edit.component.html',
  styleUrls: ['./servicio-edit.component.css']
})
export class ServicioEditComponent implements OnInit {

  form: FormGroup;
  servicio:Servicio = new Servicio();
  id:number =1;

  constructor(
    private route:ActivatedRoute,
    private store:Store<AppState>,
    private formBuilder: FormBuilder)
  {

   }

   ngOnInit(): void {

     this.route.params.subscribe( params =>{
         this.store.dispatch(new GetServicio(+params['id']))
     })


     this.form = this.formBuilder.group({
       nombre_servicio:[''],
       descripcion_servicio:[''],
       codigo_servicio:[''],
       valor_servicio:['']
    })

    this.store.select(getServicio).subscribe((servicio:Servicio) => {
        if(servicio != null){
          servicio=servicio[FIRSTZONA]
          this.id = servicio.serId;
          this.form.get('nombre_servicio').setValue(servicio.serNombre)
          this.form.get('descripcion_servicio').setValue(servicio.serDescripcion)
          this.form.get('codigo_servicio').setValue(servicio.serCodigo)
          this.form.get('valor_servicio').setValue(servicio.serValor)
        }
    });

   }


   onSaveServicio(){

     let d = new Date();
     const payload:Servicio ={
      serId: +this.id ,
      serNombre:`${this.form.get('nombre_servicio').value}`,
      serDescripcion:`${this.form.get('descripcion_servicio').value}`,
      serCodigo:0,
      serFechaCreacion: `${d.toLocaleString()}`,
      serRegistradopor: "front",
      serActivo: true,
      serValor:+this.form.get('valor_servicio').value,
      emprId: 2
    }

    this.store.dispatch(new UpdateServicio(payload));
   }
}
