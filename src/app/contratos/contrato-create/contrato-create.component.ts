import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import  * as  personasActions from '../../personas/store/actions/personas.actions';
import { getAllPersonas } from '../../personas/store/reducers/personas.reducers';
import { Persona } from '../../personas/shared/persona';
import  * as  zonasActions from '../../zonas/store/actions/zonas.actions';
import { getAllZonas } from '../../zonas/store/reducers/zonas.reducers';
import { Zona } from '../../zonas/shared/zona';
import  * as  sectoresActions from '../../sectores/store/actions/sectores.actions';
import { getAllSectores } from '../../sectores/store/reducers/sectores.reducers';
import { Sector } from '../../sectores/shared/sector';
import  * as  serviciosActions from '../../servicios/store/actions/servicios.actions';
import { getAllServicios } from '../../servicios/store/reducers/servicios.reducers';
import { Servicio } from '../../servicios/shared/servicio';
import { DataList , listPersonas , listTipoCliente , listTipoZonas , listTipoSectores , listTipoServicios } from '../shared/list'
import { Observable , of , from , Subject , BehaviorSubject , iif ,combineLatest , NEVER ,interval   } from 'rxjs';

@Component({
  selector: 'app-contrato-create',
  templateUrl: './contrato-create.component.html',
  styleUrls: ['./contrato-create.component.css']
})
export class ContratoCreateComponent implements OnInit {
  personas : Observable<Persona[]>;
  zonas : Observable<Zona[]>;
  sectores : Observable<Sector[]>;
  servicios : Observable<Servicio[]>;

  searchpersonas : Persona[];
  searchzonas : Zona[];
  searchservicios : Servicio[];

  listPersonas:DataList[];
  listTipoCliente:DataList[];
  listTipoZona:DataList[];
  listTipoSector:DataList[];
  listTipoServicio:DataList[];

  auxzona : DataList[];
  auxsector : DataList[];

  form: FormGroup;

  booSeconStepFirst: boolean = false
  booSeconStep: boolean = false
  booThirdStep: boolean = false
  booFinish: boolean = false

  strtabfirst:string  ='tab-pane active'
  strtabsecond:string  ='tab-pane'
  strtabthird:string  ='tab-pane'
  booNoLet : boolean = true

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.listTipoCliente = listTipoCliente

    this.form = this.formBuilder.group({
        cedulaname:[''],
        direccion:[''],
        email:[''],
        telefonos:[''],
        clacliente:[{ id: '1', value: 'Residencial'}],
        zonas:[''],
        sectores:[''],
        servicios:[''],
        valorservicio:[''],
        preciocontrato:['']
   })

  }

  ngOnInit(): void {
    this.personas = this.store.select(getAllPersonas);
    this.personas.subscribe( data =>{
         this.searchpersonas = data
         this.listPersonas = data.map((val:Persona)=>{
              return {
                  id:val.persId,
                  value: `(${val.persNumDocumento}) -  ${val.persNombre} ${val.persApellido} `
              }
          })
    });


    this.zonas = this.store.select(getAllZonas);
    this.zonas.subscribe( data =>{
          this.searchzonas = data
          this.listTipoZona = data.map((val:Zona)=>{
               return {
                   id:val.zonaId.toString(),
                   value: `(${val.zonaNombre}) -  ${val.zonaDescripcion}`
               }
           })
           this.auxzona = this.listTipoZona
    });


    this.sectores = this.store.select(getAllSectores);
    this.sectores.subscribe( data =>{
        this.listTipoSector = data.map((val:Sector)=>{
               return {
                   id:val.sectId.toString(),
                   value:`(${val.sectNombre}) -  ${val.sectDescripcion}`,
                   zonaId:+val.zonaId
               }
           })

          this.auxsector = this.listTipoSector
    });


    this.listTipoServicio = listTipoServicios
    this.servicios = this.store.select(getAllServicios);
    this.servicios.subscribe( data =>{
      this.searchservicios = data
      this.listTipoServicio = data.map((val:Servicio)=>{
           return {
               id:val.serId.toString(),
               value:`(${val.serNombre}) -  ${val.serDescripcion}`
           }
       })
    });
  }

  onSaveContrato(){
    console.log('onSaveContrato')
    this.booThirdStep = true
    this.booSeconStep = false
    this.strtabsecond  ='tab-pane'
    this.strtabthird  ='tab-pane active'
    this.booFinish = true;

    this.booSeconStep = false

  }


  follow(){
    this.booSeconStep = true
    this.booSeconStepFirst = true
    this.strtabfirst='tab-pane'
    this.strtabsecond='tab-pane active'

    this.booNoLet = false
  }

  prev(){
    this.booSeconStep = false
    this.booSeconStepFirst = false
    this.strtabfirst='tab-pane active'
    this.strtabsecond='tab-pane'
  }

  selectPersonas(value){
      if(value==undefined){
        this.form.get('direccion').setValue(' ')
        this.form.get('email').setValue(' ')
        this.form.get('telefonos').setValue(' ')
        return
      }

      let res = this.searchpersonas.find((val)=> val.persId == value.id)

      this.form.get('direccion').setValue(res.persDireccion)
      this.form.get('email').setValue(res.persEmail)
      this.form.get('telefonos').setValue(`${res.persCelular} - ${res.persTelefono}`)
  }

  selectZonas(value){
    this.listTipoSector = this.auxsector
    this.form.get('sectores').setValue([''])

    if(value==undefined){
      return
    }

    let res = this.listTipoSector.filter((val:DataList)=> val.zonaId == value.id)
    this.listTipoSector = res
  }

  selectSectores(value){
      if(value==undefined){
        this.listTipoSector =this.auxsector
        this.form.get('zonas').setValue(null)
        return
      }

      if(this.form.get('zonas').value){
        return
      }

      let res =  this.searchzonas.find((val:Zona) => val.zonaId == value.zonaId)
      this.form.get('zonas').setValue(
        {
          id:res.zonaId,
          value: `(${res.zonaNombre}) -  ${res.zonaDescripcion}`
        }
      )
  }


  selecServicios(value){
    if(value==undefined){
      this.form.get('valorservicio').setValue(' ')
      this.form.get('preciocontrato').setValue(' ')
      return
    }

    let res = this.searchservicios.find((val:Servicio) => val.serId == value.id)
    this.form.get('valorservicio').setValue(res.serValor)

  }

}
