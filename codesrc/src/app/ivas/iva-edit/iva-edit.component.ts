import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { GetIva , UpdateIva } from '../store/actions/ivas.actions';
import { getIva } from '../store/reducers/ivas.reducers';
import { Iva } from '../shared/iva';
import * as  fromValidation from '../../shared/validation';
import { DataList } from '../shared/list';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map} from 'rxjs/operators';
import { ValidationIvasService } from '../../shared/validations/validationIvas.service';
const FIRSTELEMENT =0


@Component({
  selector: 'app-iva-edit',
  templateUrl: './iva-edit.component.html',
  styleUrls: ['./iva-edit.component.css']
})
export class IvaEditComponent implements OnInit {
  form: FormGroup;
  iva:Iva = new Iva();
  id:number=0;

  constructor(
    private route:ActivatedRoute,
    private store:Store<AppState>,
    private formBuilder: FormBuilder,
    public validationService:ValidationIvasService){
      this.validationService.initValidation();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        iva_name:[''],
        valor:[''],
        descripcion:['']
   })

   this.route.params.subscribe( params =>{
       this.store.dispatch(new GetIva(+params['id']))
   })

   this.store.select(getIva).subscribe((iva:Iva) => {
       if(iva != null){
         iva =iva[FIRSTELEMENT]
         this.id = iva.ivaId
         this.form.get('iva_name').setValue(iva.ivaNombre)
         this.validationService.inputNombreIva(iva.ivaNombre);

         this.form.get('valor').setValue(iva.ivaValor)
         this.validationService.inputValorIva(iva.ivaNombre);

         this.form.get('descripcion').setValue(iva.ivaDescripcion)
         this.validationService.inputDescripcionIva(iva.ivaNombre);

      }
   });
  }

  onSaveIva(){
    if(this.validationService.ifGood()){
        let d = new Date();
        const payload:Iva={
          ivaId: this.id,
          ivaNombre: `${this.form.get('iva_name').value}`,
          ivaDescripcion: `${this.form.get('descripcion').value}`,
          ivaRegistradopor: "front",
          ivaFechaCreacion:`${d.toLocaleString()}`,
          ivaValor:+this.form.get('valor').value,
          ivaActivo: true
        }
        this.store.dispatch(new UpdateIva(payload));
    }
  }
}
