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

import { Departamento } from '../../departamentos/shared/departamento';
import  * as  departamentosActions from '../../departamentos/store/actions/departamentos.actions';
import { getAllDepartamentos } from '../../departamentos/store/reducers/departamentos.reducers';

import { Municipio } from '../../municipios/shared/municipio';
import  * as  municipiosActions from '../../municipios/store/actions/municipios.actions';
import { getAllMunicipios } from '../../municipios/store/reducers/municipios.reducers';

import { ValidationEmpresasService } from '../../shared/validations/validationEmpresa.service';

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

  departamentos : Observable<Departamento[]>;
  searchdepartamento : Departamento[];

  municipios : Observable<Municipio[]>;
  auxciudad:DataListCiudad[];


  constructor(
    private router:Router ,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    public validationService:ValidationEmpresasService) {

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

  selectDepartamentos(value){
    this.form.get('ciudad').setValue([])
    this.listCreateCiud = this.auxciudad
    if(value==undefined){
      this.validationService.inputDepartamento(' ');
      return
    }

    this.validationService.inputDepartamento(value.depDescripcion);
    let res = this.listCreateCiud.filter((val:DataListCiudad)=> val.depDepartamento == value.depDepartamento)
    this.listCreateCiud = res
  }

  selectMunicipios(value){
    if(value==undefined){
      this.listCreateCiud =this.auxciudad
      this.form.get('dpto').setValue(null)
      this.validationService.inputCiudad(' ');
      return
    }

    if(this.form.get('dpto').value){
      this.validationService.inputCiudad(value.cimuDescripcion);
      return
    }

    let res =  this.searchdepartamento.find((val:Departamento) => val.depDepartamento == value.depDepartamento)
    this.form.get('dpto').setValue(
      {
        depDepartamento:+res['depDepartamento'],
        depDescripcion:`${res['depDescripcion']}`,
        paPais:+res['paPais'],
        ciudadMunicipios:+res['ciudadMunicipios']
      }
    )
  }

  onSaveEmpresa(){

    if(this.validationService.ifGood()){
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

}
