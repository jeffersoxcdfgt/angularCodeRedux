import { Injectable } from '@angular/core';
import { Observable , of , from , BehaviorSubject , combineLatest   } from 'rxjs';
import { cleanBlank , ifEmpty , validObs } from '../validation';

@Injectable({ providedIn: 'root' })
export class ValidationEmpresasService {
  messages: string[] = [];

  subNit:BehaviorSubject<string>
  obsNit:any

  subNombre:BehaviorSubject<string>
  obsNombre:any

  subDireccion:BehaviorSubject<string>
  obsDireccion:any

  subEmail:BehaviorSubject<string>
  obsEmail:any

  subTelefono:BehaviorSubject<string>
  obsTelefono:any

  subTelefax:BehaviorSubject<string>
  obsTelefax:any

  subDepartamento:BehaviorSubject<string>
  obsDepartamento:any

  subCiudad:BehaviorSubject<string>
  obsCiudad:any

  click$:boolean;

  constructor(){ }

  initValidation(){
    this.subNit = new BehaviorSubject<string>('');
    this.obsNit =  of(true);

    this.subNombre = new BehaviorSubject<string>('');
    this.obsNombre =  of(true);

    this.subDireccion =  new BehaviorSubject<string>('')
    this.obsDireccion = of(true)

    this.subEmail =  new BehaviorSubject<string>('')
    this.obsEmail = of(true)

    this.subTelefono =  new BehaviorSubject<string>('')
    this.obsTelefono = of(true)

    this.subTelefax =  new BehaviorSubject<string>('')
    this.obsTelefax = of(true)

    this.subDepartamento =  new BehaviorSubject<string>('')
    this.obsDepartamento = of(true)

    this.subCiudad =  new BehaviorSubject<string>('')
    this.obsCiudad = of(true)

  }

  inputNit(str:string):void{
      this.subNit.next(str)
        this.obsNit = this.subNit.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputNombre(str:string):void{
      this.subNombre.next(str)
        this.obsNombre = this.subNombre.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputDireccion(str:string):void{
    this.subDireccion.next(str)
      this.obsDireccion = this.subDireccion.pipe(
              cleanBlank,
                  ifEmpty)
  }

  inputEmail(str:string):void{
    this.subEmail.next(str)
      this.obsEmail = this.subEmail.pipe(
              cleanBlank,
                  ifEmpty)
  }

  inputTelefono(str:string):void{
    this.subTelefono.next(str)
      this.obsTelefono = this.subTelefono.pipe(
              cleanBlank,
                  ifEmpty)
  }

  inputTelefax(str:string):void{
    this.subTelefax.next(str)
      this.obsTelefax = this.subTelefax.pipe(
              cleanBlank,
                  ifEmpty)
  }


  inputDepartamento(str:string):void{
    this.subDepartamento.next(str)
      this.obsDepartamento = this.subDepartamento.pipe(
              cleanBlank,
                  ifEmpty)
  }

  inputCiudad(str:string):void{
    this.subCiudad.next(str)
      this.obsCiudad = this.subCiudad.pipe(
              cleanBlank,
                  ifEmpty)
  }

  ifGood():boolean{
      this.click$ = false

      this.obsNit = this.subNit.pipe(cleanBlank,ifEmpty)
      this.obsNombre = this.subNombre.pipe(cleanBlank,ifEmpty)
      this.obsDireccion = this.subDireccion.pipe(cleanBlank,ifEmpty)
      this.obsEmail = this.subEmail.pipe(cleanBlank,ifEmpty)
      this.obsTelefono = this.subTelefono.pipe(cleanBlank,ifEmpty)
      this.obsTelefax = this.subTelefax.pipe(cleanBlank,ifEmpty)
      this.obsDepartamento = this.subDepartamento.pipe(cleanBlank,ifEmpty)
      this.obsCiudad = this.subCiudad.pipe(cleanBlank,ifEmpty)

      combineLatest(
        this.obsNit.pipe(validObs),
        this.obsNombre.pipe(validObs),
        this.obsDireccion.pipe(validObs),
        this.obsEmail.pipe(validObs),
        this.obsTelefono.pipe(validObs),
        this.obsTelefax.pipe(validObs),
        this.obsDepartamento.pipe(validObs),
        this.obsCiudad.pipe(validObs)
      ).subscribe(() => this.click$ =  true )

      if(this.click$){
        return true
      }
      return false
  }

}
