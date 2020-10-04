import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Factura } from '../shared/factura';
import { getFactura } from '../store/reducers/facturas.reducers';
import {  Observable  } from 'rxjs';
import {  GetFactura } from '../store/actions/facturas.actions';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray , AbstractControl } from '@angular/forms';
import { Persona } from '../../personas/shared/persona';
import  * as  personasActions from '../../personas/store/actions/personas.actions';
import { getAllPersonas } from '../../personas/store/reducers/personas.reducers';
import { getAllContratos } from '../../contratos/store/reducers/contratos.reducers';

import { Contrato } from '../../contratos/shared/contrato';

class RenderFactura {
  factura:{};
  persona:{};
}

@Component({
  selector: 'app-factura-detail',
  templateUrl: './factura-detail.component.html',
  styleUrls: ['./factura-detail.component.css']
})
export class FacturaDetailComponent implements OnInit {
  lstfacturas:Factura[];
  myFacturas:RenderFactura[];
  personas : Observable<Persona[]>;
  p: number = 1;
  idContrato:string;
  nameComplete:string;
  contratos : Contrato[];

  constructor(
    private route:ActivatedRoute,
    private store:Store<AppState>,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe( params =>{
        this.idContrato = params['id']
        this.store.dispatch(new GetFactura(params['id']))
    })

    this.store.select(getAllContratos).subscribe((data)=>{
        if(data != null){
          this.contratos = data
        }
    })

    this.store.select(getFactura).subscribe((factura:Factura) => {
        if(factura != null){
          this.lstfacturas = Object.keys(factura).map((k) => factura[k])
          this.personas = this.store.select(getAllPersonas);
          this.personas.subscribe( data =>{
              let res = this.join(this.lstfacturas,data)
              this.myFacturas = res;
              /*console.log(this.myFacturas)
              console.log('resultado')
              console.log(this.myFacturas)*/
              this.nameComplete = `${this.myFacturas[0]['persona']['persNombre']} ${this.myFacturas[0]['persona']['persApellido']} CC ${this.myFacturas[0]['persona']['persNumDocumento']}`
          });
        }
    });
  }

  join(facturas, personas){
    return facturas.map(factura=>{
      return personas
        .filter(persona => persona.persId == factura.persId)
        .map(persona=>{
          return {
            factura:factura,
            persona:persona,
            contrato:this.contratos.find((contrato:Contrato) => contrato.numeroContrato == factura.contrato.contNumero )
          }
        })
    }).reduce((a,b)=>{
      return a.concat(b)
    },[])

  }

}
