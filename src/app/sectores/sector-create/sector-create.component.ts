import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AddSector } from '../store/actions/sectores.actions';
import { Sector } from  '../shared/sector';
import * as  fromValidation from '../../shared/validation';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map} from 'rxjs/operators';
import { DataList , listZonas  } from '../shared/list';
import { isCreated } from '../store/reducers/sectores.reducers';

import { Zona } from '../../zonas/shared/zona';
import  * as  zonasActions from '../../zonas/store/actions/zonas.actions';
import { getAllZonas } from '../../zonas/store/reducers/zonas.reducers';
import { ValidationSectoresService } from '../../shared/validations/validationSectores.service';

@Component({
  selector: 'app-sector-create',
  templateUrl: './sector-create.component.html',
  styleUrls: ['./sector-create.component.css']
})
export class SectorCreateComponent implements OnInit {
  form: FormGroup;
  listZonas:DataList[];
  zonas : Observable<Zona[]>;

  constructor(
    private router:Router ,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    public validationService:ValidationSectoresService) {
     this.validationService.initValidation();

      this.store.dispatch(new zonasActions.GetAllZonas());
      this.zonas = this.store.select(getAllZonas);
      this.zonas.subscribe( data =>{
        if(data!=null){ this.listZonas = data.map((val)=>{ return { id:val.zonaId, value:val.zonaNombre  } }) }
      });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        zona:[''],
        abrsector:[''],
        sector_name:[''],
        recargo:[''],
        descripcion:['']
   })
  }


  selectSector(value){
    if(value==undefined){
        this.validationService.inputNombreZona(' ');
      return
    }
    this.validationService.inputNombreZona(value['value']);
  }

  onSaveSector(){
    if(this.validationService.ifGood()){
        let d = new Date();
         const payload:Sector ={
          zonaId:+this.form.get('zona').value.id,
          sectAbreviatura:`${this.form.get('abrsector').value}`,
          sectNombre:`${this.form.get('sector_name').value}`,
          sectDescripcion:`${this.form.get('descripcion').value}`,
          sectRecargo:+this.form.get('recargo').value,
          sectRegistradopor: "front",
          sectFechaCreacion: `${d.toLocaleString()}`,
          sectActivo: true
        }
        this.store.dispatch(new AddSector(payload));
    }
  }

}
