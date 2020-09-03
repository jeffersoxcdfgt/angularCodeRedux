import { Injectable } from '@angular/core';
import { Observable , of , from , BehaviorSubject , combineLatest   } from 'rxjs';
import { cleanBlank , ifEmpty , validObs } from '../validation';

@Injectable({ providedIn: 'root' })
export class ValidationSectoresService {
  messages: string[] = [];

  subNombreZona:BehaviorSubject<string>
  obsNombreZona:any

  subSectorAbr:BehaviorSubject<string>
  obsSectorAbr:any

  subNombreSector:BehaviorSubject<string>
  obsNombreSector:any

  subRecargo:BehaviorSubject<string>
  obsRecargo:any

  subDescripcionSector:BehaviorSubject<string>
  obsDescripcionSector:any

  click$:boolean;

  constructor(){ }


  initValidation(){
    this.subNombreZona = new BehaviorSubject<string>('');
    this.obsNombreZona =  of(true);

    this.subSectorAbr = new BehaviorSubject<string>('');
    this.obsSectorAbr =  of(true);

    this.subNombreSector =  new BehaviorSubject<string>('')
    this.obsNombreSector = of(true)

    this.subRecargo =  new BehaviorSubject<string>('')
    this.obsRecargo = of(true)

    this.subDescripcionSector =  new BehaviorSubject<string>('')
    this.obsDescripcionSector = of(true)

  }

  inputNombreZona(str:string):void{
      this.subNombreZona.next(str)
        this.obsNombreZona = this.subNombreZona.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputAbrSector(str:string):void{
      this.subSectorAbr.next(str)
        this.obsSectorAbr = this.subSectorAbr.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputNombreSector(str:string):void{
    this.subNombreSector.next(str)
      this.obsNombreSector = this.subNombreSector.pipe(
              cleanBlank,
                  ifEmpty)
  }

  inputRecargo(str:string):void{
    this.subRecargo.next(str)
      this.obsRecargo = this.subRecargo.pipe(
              cleanBlank,
                  ifEmpty)
  }

  inputDescripcionSector(str:string):void{
    this.subDescripcionSector.next(str)
      this.obsDescripcionSector = this.subDescripcionSector.pipe(
              cleanBlank,
                  ifEmpty)
  }


  ifGood():boolean{
      this.click$ = false

      this.obsNombreZona = this.subNombreZona.pipe(cleanBlank,ifEmpty)
      this.obsSectorAbr = this.subSectorAbr.pipe(cleanBlank,ifEmpty)
      this.obsNombreSector = this.subNombreSector.pipe(cleanBlank,ifEmpty)
      this.obsRecargo = this.subRecargo.pipe(cleanBlank,ifEmpty)
      this.obsDescripcionSector = this.subDescripcionSector.pipe(cleanBlank,ifEmpty)

      combineLatest(
        this.obsNombreZona.pipe(validObs),
        this.obsSectorAbr.pipe(validObs),
        this.obsNombreSector.pipe(validObs),
        this.obsRecargo.pipe(validObs),
        this.obsDescripcionSector.pipe(validObs)
      ).subscribe(() => this.click$ =  true )

      if(this.click$){
        return true
      }
      return false
  }

}
