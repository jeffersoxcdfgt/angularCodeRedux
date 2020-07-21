import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { GetZona , UpdateZona } from '../store/actions/zonas.actions';
import { getZona } from '../store/reducers/zonas.reducers';
import {  Zona , ZonaCreate } from '../shared/zona';
import { DataListDepto , listDpto , DataListCiudad, listCiud } from '../shared/list';
import * as  fromValidation from '../../shared/validation';
import { DataList } from '../shared/list';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map } from 'rxjs/operators';
const FIRSTZONA=0

@Component({
  selector: 'app-zona-edit',
  templateUrl: './zona-edit.component.html',
  styleUrls: ['./zona-edit.component.css']
})
export class ZonaEditComponent implements OnInit {

  zona:Zona = new Zona();
  id:number =1;
  form: FormGroup;
  listCreateDpto:DataListDepto[];
  listCreateCiud:DataListCiudad[];

  constructor(
    private route:ActivatedRoute,
    private store:Store<AppState>,
    private formBuilder: FormBuilder)
  {
    this.listCreateDpto = listDpto;
    this.listCreateCiud = listCiud;
   }

  ngOnInit(): void {
    this.route.params.subscribe( params =>{
        this.store.dispatch(new GetZona(+params['id']))
    })


    this.form = this.formBuilder.group({
        nombre_zona:[''],
        descripcion:[''],
        departamento:[''],
        municipio:['']
   })

    this.store.select(getZona).subscribe((zona:Zona) => {
        if(zona != null){
            zona=zona[FIRSTZONA]
            this.id = zona.zonaId;
            this.form.get('nombre_zona').setValue(zona.zonaNombre)
            this.form.get('descripcion').setValue(zona.zonaDescripcion)
            this.form.get('departamento').setValue({ depDepartamento: 13, depDescripcion: 'BOLIVAR' , paPais:1 , ciudadMunicipios:null })
            this.form.get('municipio').setValue({ cimuId: 5021, cimuDescripcion: 'ALEJANDRIA' , depDepartamento:5 })
        }
    });
  }

  onSaveZona(){
    let d = new Date();
    const payloadEdit:ZonaCreate={
      zonaId: this.id ,
      zonaNombre:  `${this.form.get('nombre_zona').value}`,
      zonaDescripcion: `${this.form.get('descripcion').value}`,
      zonaRegistradopor: "front",
      zonaFechaCreacion: `${d.toLocaleString()}`,
      cimuId: +`${this.form.get('municipio').value.cimuId}`,
      zonaActivo: true,
      depDescripcion:`${this.form.get('departamento').value.depDescripcion}`,
      cimuDescripcion:`${this.form.get('municipio').value.cimuDescripcion}`
    }
     this.store.dispatch(new UpdateZona(payloadEdit));
  }

}
