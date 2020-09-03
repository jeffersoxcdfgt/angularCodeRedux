import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { GetEmpresa , UpdateEmpresa } from '../store/actions/empresas.actions';
import { getEmpresa } from '../store/reducers/empresas.reducers';
import {  Empresa } from '../shared/empresa';
import * as  fromValidation from '../../shared/validation';
import { DataListDepto , listDpto , DataListCiudad, listCiud } from '../shared/list';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map} from 'rxjs/operators';
const FIRSTELEMENT =0

@Component({
  selector: 'app-empresa-edit',
  templateUrl: './empresa-edit.component.html',
  styleUrls: ['./empresa-edit.component.css']
})
export class EmpresaEditComponent implements OnInit {

  form: FormGroup;
  Empresa:Empresa = new Empresa();
  listCreateDpto:DataListDepto[];
  listCreateCiud:DataListCiudad[];
  id:number=0;

  constructor(
    private route:ActivatedRoute,
    private store:Store<AppState>,
    private formBuilder: FormBuilder){
      this.listCreateDpto = listDpto;
      this.listCreateCiud = listCiud;
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

   this.route.params.subscribe( params =>{
       this.store.dispatch(new GetEmpresa(+params['id']))
   })

   this.store.select(getEmpresa).subscribe((empresa:Empresa) => {
       if(empresa != null){
         empresa =empresa[FIRSTELEMENT]
         this.id=empresa.emprId
         this.form.get('nit').setValue(empresa.emprNit)
         this.form.get('nombre').setValue(empresa.emprNombre)
         this.form.get('direccion').setValue(empresa.emprDireccion)
         this.form.get('email').setValue(empresa.emprEmail)

         this.form.get('telefono').setValue(empresa.emprTelefono)
         this.form.get('telefax').setValue(empresa.emprTelefax)

         this.form.get('dpto').setValue({ depDepartamento: empresa.idDepartamento, depDescripcion : empresa.departamento , paPais:1 , ciudadMunicipios:null })
         this.form.get('ciudad').setValue({ cimuId: empresa.idEmprCiudad, cimuDescripcion: empresa.emprCiudad , depDepartamento:empresa.idDepartamento })
         console.log(empresa)
      }
   });

  }


  onSaveEmpresa(){
    let d = new Date();
    const payload:Empresa = {
      emprId: this.id,
      emprNit: `${this.form.get('nit').value}`,
      emprNombre: `${this.form.get('nombre').value}`,
      emprDireccion:`${this.form.get('direccion').value}`,
      emprEmail: `${this.form.get('email').value}`,
      emprTelefono: `${this.form.get('telefono').value}`,
      emprTelefax: `${this.form.get('telefax').value}`,
      emprFechaInicio:`${d.toLocaleString()}`,
      emprRegistradopor: "front",
      emprFechaCreacion:`${d.toLocaleString()}`,
      emprCiudad:`${this.form.get('ciudad').value.cimuDescripcion}`,
      emprEstado: true,
      cimuId:+this.form.get('ciudad').value.cimuId
    }
    this.store.dispatch(new UpdateEmpresa(payload));
  }

}
