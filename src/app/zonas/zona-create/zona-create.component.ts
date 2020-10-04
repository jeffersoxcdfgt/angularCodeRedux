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

import { Departamento } from '../../departamentos/shared/departamento';
import  * as  departamentosActions from '../../departamentos/store/actions/departamentos.actions';
import { getAllDepartamentos } from '../../departamentos/store/reducers/departamentos.reducers';

import { Municipio } from '../../municipios/shared/municipio';
import  * as  municipiosActions from '../../municipios/store/actions/municipios.actions';
import { getAllMunicipios } from '../../municipios/store/reducers/municipios.reducers';

import { ValidationZonasService } from '../../shared/validations/validationZonas.service';

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
  departamentos : Observable<Departamento[]>;
  searchdepartamento : Departamento[];
  municipios : Observable<Municipio[]>;
  auxciudad:DataListCiudad[];

  constructor(
    private router:Router ,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    public validationService:ValidationZonasService) {
      this.validationService.initValidation();

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
      this.form = this.formBuilder.group({
          zona_name:[''],
          descripcion:[''],
          departamento:[''],
          municipio:['']
     })
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

    onSaveZona():void {
      if(this.validationService.ifGood()){
          let d = new Date();
          const payloadZona:ZonaCreate ={
            zonaNombre: `${this.form.get('zona_name').value}`,
            zonaDescripcion: `${this.form.get('descripcion').value}`,
            zonaRegistradopor: "front",
            zonaFechaCreacion: `${d.toLocaleString()}`,
            cimuId: +this.form.get('municipio').value['cimuId'],
            zonaActivo: true,
            depDescripcion:`${this.form.get('departamento').value['depDescripcion']}`,
            cimuDescripcion:`${this.form.get('municipio').value['cimuDescripcion']}`
          }

          this.store.dispatch(new AddZona(payloadZona));
       }
    }

}
