import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { GetSector , UpdateSector } from '../store/actions/sectores.actions';
import { getSector } from '../store/reducers/sectores.reducers';
import {  Sector  } from '../shared/sector';
import * as  fromValidation from '../../shared/validation';
import { DataList , listZonas } from '../shared/list';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map } from 'rxjs/operators';

import { Zona } from '../../zonas/shared/zona';
import  * as  zonasActions from '../../zonas/store/actions/zonas.actions';
import { getAllZonas } from '../../zonas/store/reducers/zonas.reducers';

const FIRSTSECTOR =0

@Component({
  selector: 'app-sector-edit',
  templateUrl: './sector-edit.component.html',
  styleUrls: ['./sector-edit.component.css']
})
export class SectorEditComponent implements OnInit {
  form: FormGroup;
  listZonas:DataList[];
  zonas : Observable<Zona[]>;
  id:number =0

  constructor(
    private route:ActivatedRoute,
    private router:Router ,
    private store: Store<AppState>,
    private formBuilder: FormBuilder) {

      this.store.dispatch(new zonasActions.GetAllZonas());
      this.zonas = this.store.select(getAllZonas);
      this.zonas.subscribe( data =>{
        if(data!=null){ this.listZonas = data.map((val)=>{ return { id:val.zonaId, value:val.zonaNombre  } }) }
      });
  }

  ngOnInit(): void {

    this.route.params.subscribe( params =>{
        this.store.dispatch(new GetSector(+params['id']))
    })

    this.form = this.formBuilder.group({
        zona:[''],
        abrsector:[''],
        sector_name:[''],
        recargo:[''],
        descripcion:['']
   })

   this.store.select(getSector).subscribe((sector:Sector) => {
       if(sector != null){
           sector=sector[FIRSTSECTOR]
           this.id = sector.sectId
           this.form.get('abrsector').setValue(sector.sectAbreviatura)
           this.form.get('sector_name').setValue(sector.sectNombre)
           this.form.get('recargo').setValue(sector.sectRecargo)
           this.form.get('descripcion').setValue(sector.sectDescripcion)
           let res =this.listZonas.find(val=> val.id == sector.zonaId)
           this.form.get('zona').setValue(res)
       }
   });

  }


  onSaveSector(){
    let d = new Date();
    const payload:Sector ={
       sectId:+this.id,
       zonaId:+this.form.get('zona').value.id,
       sectAbreviatura:`${this.form.get('abrsector').value}`,
       sectNombre:`${this.form.get('sector_name').value}`,
       sectDescripcion:`${this.form.get('descripcion').value}`,
       sectRecargo:+this.form.get('recargo').value,
       sectRegistradopor: "front",
       sectFechaCreacion: `${d.toLocaleString()}`,
       sectActivo: true
    }
    this.store.dispatch(new UpdateSector(payload));
  }

}
