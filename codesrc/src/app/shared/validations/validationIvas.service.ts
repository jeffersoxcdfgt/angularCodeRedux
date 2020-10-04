import { Injectable } from '@angular/core';
import { Observable , of , from , BehaviorSubject , combineLatest   } from 'rxjs';
import { cleanBlank , ifEmpty , validObs } from '../validation';

@Injectable({ providedIn: 'root' })
export class ValidationIvasService {
  messages: string[] = [];

  subNombreIva:BehaviorSubject<string>
  obsNombreIva:any

  subValorIva:BehaviorSubject<string>
  obsValorIva:any

  subDescripcionIva:BehaviorSubject<string>
  obsDescripcionIva:any

  click$:boolean;

  constructor(){ }

  initValidation(){
    this.subNombreIva = new BehaviorSubject<string>('');
    this.obsNombreIva =  of(true);

    this.subValorIva = new BehaviorSubject<string>('');
    this.obsValorIva =  of(true);

    this.subDescripcionIva =  new BehaviorSubject<string>('')
    this.obsDescripcionIva = of(true)
  }

  inputNombreIva(str:string):void{
      this.subNombreIva.next(str)
        this.obsNombreIva = this.subNombreIva.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputValorIva(str:string):void{
      this.subValorIva.next(str)
        this.obsValorIva = this.subValorIva.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputDescripcionIva(str:string):void{
    this.subDescripcionIva.next(str)
      this.obsDescripcionIva = this.subDescripcionIva.pipe(
              cleanBlank,
                  ifEmpty)
  }

  ifGood():boolean{
      this.click$ = false

      this.obsNombreIva = this.subNombreIva.pipe(cleanBlank,ifEmpty)
      this.obsValorIva = this.subValorIva.pipe(cleanBlank,ifEmpty)
      this.obsDescripcionIva = this.subDescripcionIva.pipe(cleanBlank,ifEmpty)

      combineLatest(
        this.obsNombreIva.pipe(validObs),
        this.obsValorIva.pipe(validObs),
        this.obsDescripcionIva.pipe(validObs)
      ).subscribe(() => this.click$ =  true )

      if(this.click$){
        return true
      }
      return false
  }

}
