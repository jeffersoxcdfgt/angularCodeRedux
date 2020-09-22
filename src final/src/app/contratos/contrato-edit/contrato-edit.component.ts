import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { GetContrato , UpdateContrato } from '../store/actions/contratos.actions';
import { getContrato } from '../store/reducers/contratos.reducers';
import { Contrato , ContratoUpdate } from '../shared/contrato';
import * as  fromValidation from '../../shared/validation';
import { DataList , listPersonas , listTipoCliente , listTipoZonas , listTipoSectores , listTipoServicios } from '../shared/list';
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';
import { tap , map} from 'rxjs/operators';

import  * as  sectoresActions from '../../sectores/store/actions/sectores.actions';
import { getAllSectores } from '../../sectores/store/reducers/sectores.reducers';
import { Sector } from '../../sectores/shared/sector';

import  * as  serviciosActions from '../../servicios/store/actions/servicios.actions';
import { getAllServicios } from '../../servicios/store/reducers/servicios.reducers';
import { Servicio } from '../../servicios/shared/servicio';

import  * as  personasActions from '../../personas/store/actions/personas.actions';
import { getAllPersonas } from '../../personas/store/reducers/personas.reducers';
import { Persona } from '../../personas/shared/persona';
const FIRSTELEMENT =0

@Component({
  selector: 'app-contrato-edit',
  templateUrl: './contrato-edit.component.html',
  styleUrls: ['./contrato-edit.component.css']
})
export class ContratoEditComponent implements OnInit {

  sectores : Observable<Sector[]>;
  listTipoSector:DataList[];

  servicios : Observable<Servicio[]>;
  listTipoServicio:DataList[];

  personas : Observable<Persona[]>;
  listPersonas:DataList[];

  listTipoCliente:DataList[];

  form: FormGroup;

  contId:number;
  escoId:number;
  soseId:number;
  persId:string;
  contNumero:string;
  direccion: string;
  telefono: string;
  serId: number;
  contCuota:number;

  constructor(
    private route:ActivatedRoute,
    private store:Store<AppState>,
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
          telefonos:[''],
          clacliente:[{ id: '1', value: 'Residencial'}],
          sectores:[''],
          servicios:[''],
          ressolidario:['']
     })
    }

  ngOnInit(): void {
    this.route.params.subscribe( params =>{
      this.store.dispatch(new GetContrato(params['id']))
    })

    this.store.select(getContrato).subscribe((contrato:Contrato) => {
        if(contrato != null){
            contrato=contrato[FIRSTELEMENT]
            this.contId = contrato['contId']
            this.escoId = contrato['escoId']
            this.soseId = contrato['soseId']
            this.persId = contrato['persona']['persId']
            this.contNumero = contrato['contNumero']
            this.direccion =  contrato['persona']['persDireccion']
            this.telefono =  contrato['persona']['persTelefono']
            this.serId =  contrato['servicio']['serId']
            this.contCuota =contrato['contCuota']

            this.sectores = this.store.select(getAllSectores);
            this.sectores.subscribe( data =>{
                this.listTipoSector = data.map((val:Sector)=>{
                       return {
                           id:val.sectId.toString(),
                           value:`(${val.sectNombre}) -  ${val.sectDescripcion}`,
                           zonaId:+val.zonaId
                       }
                })

                this.form.get('sectores').setValue({
                      id:contrato['sector']['sectId'],
                      value:contrato['sector']['sectDescripcion'],
                      zonaId:+contrato['zona']['zonaId']
                 })
            });

            this.form.get('telefonos').setValue(contrato['contTelefono'])
            this.listTipoCliente = listTipoCliente
            this.form.get('clacliente').setValue({ id: contrato['clclId'], value: contrato['clclId']==1 ? 'Residencial' : 'Comercial'})

            this.listTipoServicio = listTipoServicios
            this.servicios = this.store.select(getAllServicios);
            this.servicios.subscribe( data =>{
              this.listTipoServicio = data.map((val:Servicio)=>{
                   return {
                       id:val.serId.toString(),
                       value:`(${val.serNombre}) -  ${val.serDescripcion}`
                   }
               })

               this.form.get('servicios').setValue({
                    id:contrato['servicio']['serId'],
                    value:contrato['servicio']['serDescripcion']
               })
            });


            this.personas = this.store.select(getAllPersonas);
            this.personas.subscribe( data =>{
                 this.listPersonas = data.map((val:Persona)=>{
                      return {
                          id:val.persId,
                          value: `(${val.persNumDocumento}) -  ${val.persNombre} ${val.persApellido} `
                      }
                  })

                  this.form.get('ressolidario').setValue({
                       id:contrato['persona']['persId'],
                       value:  `(${contrato['persona']['persNumDocumento']}) -  ${contrato['persona']['persNombre']} ${contrato['persona']['persApellido']}`
                  })
            });
         }
      });
  }

  selectSectores(value){  }

  selecServicios(value){  }

  onSaveContrato(){
    let d = new Date();
    const payload:ContratoUpdate = {
        contId: +this.contId,
        clclId: +this.form.get('clacliente').value.id,
        sectId: +this.form.get('sectores').value.id,
        escoId: +this.escoId,
        soseId: +this.soseId,
        persId: `${this.persId}`,
        contNumero: `${this.contNumero}`,
        contCuota: +this.contCuota,
        contDireccion: `${this.direccion}`,
        contTelefono: `${this.telefono}`,
        contFechaInstalacion: `${d.toLocaleString()}`,
        servicio: {
           serId: this.serId
        }
      }
      this.store.dispatch(new UpdateContrato(payload))
   }

}
