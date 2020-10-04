import { Injectable } from '@angular/core';
import { Observable , of , from , BehaviorSubject , combineLatest   } from 'rxjs';
import { cleanBlank , ifEmpty , validObs } from '../validation';

@Injectable({ providedIn: 'root' })
export class ValidationZonasService {
  messages: string[] = [];

  subNombreZona:BehaviorSubject<string>
  obsNombreZona:any

  subDescripcionZona:BehaviorSubject<string>
  obsDescripcionZona:any

  subDepartamentoZona:BehaviorSubject<string>
  obsDepartamentoZona:any

  subMunicipioZona:BehaviorSubject<string>
  obsMunicipioZona:any

  click$:boolean;

  constructor(){ }


  initValidation(){
    this.subNombreZona = new BehaviorSubject<string>('');
    this.obsNombreZona =  of(true);

    this.subDescripcionZona = new BehaviorSubject<string>('');
    this.obsDescripcionZona =  of(true);

    this.subDepartamentoZona =  new BehaviorSubject<string>('')
    this.obsDepartamentoZona = of(true)

    this.subMunicipioZona =  new BehaviorSubject<string>('')
    this.obsMunicipioZona = of(true)
  }

  inputNombreZona(str:string):void{
      this.subNombreZona.next(str)
        this.obsNombreZona = this.subNombreZona.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputDescripcionZona(str:string):void{
      this.subDescripcionZona.next(str)
        this.obsDescripcionZona = this.subDescripcionZona.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputDepartamentoZona(str:string):void{
    this.subDepartamentoZona.next(str)
      this.obsDepartamentoZona = this.subDepartamentoZona.pipe(
              cleanBlank,
                  ifEmpty)
  }

  inputMunicipioZona(str:string):void{
    this.subMunicipioZona.next(str)
      this.obsMunicipioZona = this.subMunicipioZona.pipe(
              cleanBlank,
                  ifEmpty)
  }


  ifGood():boolean{
      this.click$ = false

      this.obsNombreZona = this.subNombreZona.pipe(cleanBlank,ifEmpty)
      this.obsDescripcionZona = this.subDescripcionZona.pipe(cleanBlank,ifEmpty)
      this.obsDepartamentoZona = this.subDepartamentoZona.pipe(cleanBlank,ifEmpty)
      this.obsMunicipioZona = this.subMunicipioZona.pipe(cleanBlank,ifEmpty)

      combineLatest(
        this.obsNombreZona.pipe(validObs),
        this.obsDescripcionZona.pipe(validObs),
        this.obsDepartamentoZona.pipe(validObs),
        this.obsMunicipioZona.pipe(validObs)
      ).subscribe(() => this.click$ =  true )

      if(this.click$){
        return true
      }
      return false
  }

}
