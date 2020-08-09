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
import { ValidationZonasService } from '../../shared/validations/validationZonas.service';

import { Departamento } from '../../departamentos/shared/departamento';
import  * as  departamentosActions from '../../departamentos/store/actions/departamentos.actions';
import { getAllDepartamentos } from '../../departamentos/store/reducers/departamentos.reducers';

import { Municipio } from '../../municipios/shared/municipio';
import  * as  municipiosActions from '../../municipios/store/actions/municipios.actions';
import { getAllMunicipios } from '../../municipios/store/reducers/municipios.reducers';

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
  departamentos : Observable<Departamento[]>;
  searchdepartamento : Departamento[];
  municipios : Observable<Municipio[]>;
  auxciudad:DataListCiudad[];

  constructor(
    private route:ActivatedRoute,
    private store:Store<AppState>,
    private formBuilder: FormBuilder,
    public validationService:ValidationZonasService){
    this.validationService.initValidation();

    //this.listCreateDpto = listDpto;
    //this.listCreateCiud = listCiud;


    this.departamentos = this.store.select(getAllDepartamentos);
    this.departamentos.subscribe( data =>{
        this.searchdepartamento =  data
        this.listCreateDpto = data.map((val:Departamento)=>{
           return {
             depDepartamento:+val.depDepartamento,
             depDescripcion:`${val.depDescripcion}`,
             paPais:+val.paPais,
             ciudadMunicipios:+val.ciudadMunicipios
          }
       })
    });


    this.municipios = this.store.select(getAllMunicipios);
    this.municipios.subscribe( data =>{
      this.listCreateCiud = data.map((val:Municipio)=>{
         return {
           cimuId:+val.cimuId,
           cimuDescripcion:`${val.cimuDescripcion}`,
           depDepartamento:+val.depDepartamento,
        }
     })
     this.auxciudad = this.listCreateCiud
    });
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
            this.validationService.subNombreZona.next(zona.zonaNombre);

            this.form.get('descripcion').setValue(zona.zonaDescripcion)
            this.validationService.subDescripcionZona.next(zona.zonaDescripcion);

            this.form.get('departamento').setValue({ depDepartamento: +zona['depDepartamento'], depDescripcion: `${zona['depDescripcion']}` , paPais:1 , ciudadMunicipios:null })
            this.validationService.subDepartamentoZona.next(`${zona['depDescripcion']}`);

            this.form.get('municipio').setValue({ cimuId: +zona['cimuId'], cimuDescripcion: `${zona['cimuDescripcion']}` , depDepartamento:+zona['depDepartamento'] })
            this.validationService.subMunicipioZona.next(`${zona['cimuDescripcion']}`);
        }
    });
  }

  selectDepartamentos(value){
    this.form.get('municipio').setValue([])
    this.listCreateCiud = this.auxciudad
    if(value==undefined){
        this.validationService.inputDepartamentoZona(' ');
      return
    }

    this.validationService.inputDepartamentoZona(value['depDescripcion']);
    let res = this.listCreateCiud.filter((val:DataListCiudad)=> val.depDepartamento == value.depDepartamento)
    this.listCreateCiud = res
  }

  selectMunicipios(value){
    if(value==undefined){
      this.listCreateCiud =this.auxciudad
      this.form.get('departamento').setValue(null)
      this.validationService.inputMunicipioZona(' ');
      this.validationService.inputDepartamentoZona(' ');
      return
    }

    this.validationService.inputMunicipioZona(value['cimuDescripcion']);
    if(this.form.get('departamento').value){
      return
    }

    let res =  this.searchdepartamento.find((val:Departamento) => val.depDepartamento == value.depDepartamento)
    this.validationService.inputDepartamentoZona(res['depDescripcion']);

    this.form.get('departamento').setValue(
      {
        depDepartamento:+res['depDepartamento'],
        depDescripcion:`${res['depDescripcion']}`,
        paPais:+res['paPais'],
        ciudadMunicipios:+res['ciudadMunicipios']
      }
    )
  }

  onSaveZona(){
    if(this.validationService.ifGood()){
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

}
