import { Injectable } from '@angular/core';
import { Observable , of , from , BehaviorSubject , combineLatest   } from 'rxjs';
import { cleanBlank , ifEmpty , validObs } from '../validation';

@Injectable({ providedIn: 'root' })
export class ValidationRolService {
  messages: string[] = [];

  subNombreRol:BehaviorSubject<string>
  obsNombreRol:any

  subDescripcionRol:BehaviorSubject<string>
  obsDescripcionRol:any

  click$:boolean;

  constructor(){ }


  initValidation(){
    this.subNombreRol = new BehaviorSubject<string>('');
    this.obsNombreRol =  of(true);

    this.subDescripcionRol = new BehaviorSubject<string>('');
    this.obsDescripcionRol =  of(true);
  }

  inputNombreRol(str:string):void{
      this.subNombreRol.next(str)
        this.obsNombreRol = this.subNombreRol.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputDescripcionRol(str:string):void{
      this.subDescripcionRol.next(str)
        this.obsDescripcionRol = this.subDescripcionRol.pipe(
                cleanBlank,
                    ifEmpty)
  }


  ifGood():boolean{
      this.click$ = false
      this.obsNombreRol = this.subNombreRol.pipe(cleanBlank,ifEmpty)
      this.obsDescripcionRol = this.subDescripcionRol.pipe(cleanBlank,ifEmpty)

      combineLatest(
        this.obsNombreRol.pipe(validObs),
        this.obsDescripcionRol.pipe(validObs)
      ).subscribe(() => this.click$ =  true )

      if(this.click$){
        return true
      }
      return false
  }

}
