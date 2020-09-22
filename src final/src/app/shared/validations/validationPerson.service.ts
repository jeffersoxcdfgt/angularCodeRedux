import { Injectable } from '@angular/core';
import { Observable , of , from , BehaviorSubject , combineLatest   } from 'rxjs';
import { cleanBlank , ifEmpty , validObs } from '../validation';

@Injectable({ providedIn: 'root' })
export class ValidationPersonService {
  messages: string[] = [];

  subTipoDocumento:BehaviorSubject<string>
  obsTipoDocumento:any

  subNumeroDocumento:BehaviorSubject<string>
  obsNumeroDocumento:any

  subNombres:BehaviorSubject<string>
  obsNombres:any

  subApellidos:BehaviorSubject<string>
  obsApellidos:any

  subTipoPersona:BehaviorSubject<string>
  obsTipoPersona:any

  subSexo:BehaviorSubject<string>
  obsSexo:any

  subEstadoCivil:BehaviorSubject<string>
  obsEstadoCivil:any

  subFechaNacimiento:BehaviorSubject<string>
  obsFechaNacimiento:any

  subDireccion:BehaviorSubject<string>
  obsDireccion:any

  subTelefono:BehaviorSubject<string>
  obsTelefono:any

  subCelular:BehaviorSubject<string>
  obsCelular:any

  subUsuario:BehaviorSubject<string>
  obsUsuario:any

  subPassword:BehaviorSubject<string>
  obsPassword:any

  subEmpresa:BehaviorSubject<string>
  obsEmpresa:any

  subRol:BehaviorSubject<string>
  obsRol:any

  click$:boolean;

  constructor(){ }


  initValidation(){
    this.subTipoDocumento = new BehaviorSubject<string>('');
    this.obsTipoDocumento =  of(true);

    this.subNumeroDocumento = new BehaviorSubject<string>('');
    this.obsNumeroDocumento =  of(true);

    this.subNombres = new BehaviorSubject<string>('');
    this.obsNombres =  of(true);

    this.subApellidos = new BehaviorSubject<string>('');
    this.obsApellidos =  of(true);

    this.subTipoPersona = new BehaviorSubject<string>('')
    this.obsTipoPersona = of(true);

    this.subSexo = new BehaviorSubject<string>('')
    this.obsSexo  = of(true);

    this.subEstadoCivil = new BehaviorSubject<string>('')
    this.obsEstadoCivil = of(true)

    this.subFechaNacimiento = new BehaviorSubject<string>('')
    this.obsFechaNacimiento = of(true)

    this.subDireccion = new BehaviorSubject<string>('')
    this.obsDireccion = of(true)

    this.subTelefono=  new BehaviorSubject<string>('')
    this.obsTelefono = of(true)

    this.subCelular =  new BehaviorSubject<string>('')
    this.obsCelular = of(true)

    this.subUsuario = new BehaviorSubject<string>('')
    this.obsUsuario  = of(true)

    this.subPassword = new BehaviorSubject<string>('')
    this.obsPassword  = of(true)

    this.subEmpresa =  new BehaviorSubject<string>('')
    this.obsEmpresa = of(true)

    this.subRol =  new BehaviorSubject<string>('')
    this.obsRol = of(true)
  }

  inputTipoDocumento(str:string):void{
      this.subTipoDocumento.next(str)
        this.obsTipoDocumento = this.subTipoDocumento.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputNumeroDocumento(str:string):void{
      this.subNumeroDocumento.next(str)
        this.obsNumeroDocumento = this.subNumeroDocumento.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputNombres(str:string):void{
      this.subNombres.next(str)
        this.obsNombres = this.subNombres.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputApellidos(str:string):void{
      this.subApellidos.next(str)
        this.obsApellidos = this.subApellidos.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputTipoPersonas(str:string):void{
      this.subTipoPersona.next(str)
        this.obsTipoPersona = this.subTipoPersona.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputSexo(str:string):void{
      this.subSexo.next(str)
        this.obsSexo = this.subSexo.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputEstadoCivil(str:string):void{
      this.subEstadoCivil.next(str)
        this.obsEstadoCivil = this.subEstadoCivil.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputFechaNacimiento(str:string):void{
      this.subFechaNacimiento.next(str)
        this.obsFechaNacimiento = this.subFechaNacimiento.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputDireccion(str:string):void{
      this.subDireccion.next(str)
        this.obsDireccion = this.subDireccion.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputTelefono(str:string):void{
      this.subTelefono.next(str)
        this.obsTelefono = this.subTelefono.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputCelular(str:string):void{
      this.subCelular.next(str)
        this.obsCelular = this.subCelular.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputUsuario(str:string):void{
      this.subUsuario.next(str)
        this.obsUsuario = this.subUsuario.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputPassword(str:string):void{
      this.subPassword.next(str)
        this.obsPassword = this.subPassword.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputEmpresa(str:string):void{
      this.subEmpresa.next(str)
        this.obsEmpresa = this.subEmpresa.pipe(
                cleanBlank,
                    ifEmpty)
  }

  inputRol(value ):void{
      this.subRol.next(value)
        this.obsRol = this.subRol.pipe(
                cleanBlank,
                    ifEmpty)
  }


  ifGood():boolean{
      this.click$ = false
      this.obsTipoDocumento = this.subTipoDocumento.pipe(cleanBlank,ifEmpty)
      this.obsNumeroDocumento = this.subNumeroDocumento.pipe(cleanBlank,ifEmpty)
      this.obsNombres = this.subNombres.pipe(cleanBlank,ifEmpty)
      this.obsApellidos = this.subApellidos.pipe(cleanBlank,ifEmpty)
      this.obsTipoPersona = this.subTipoPersona.pipe(cleanBlank,ifEmpty)
      this.obsSexo = this.subSexo.pipe(cleanBlank,ifEmpty)
      this.obsEstadoCivil = this.subEstadoCivil.pipe(cleanBlank,ifEmpty)
      this.obsFechaNacimiento = this.subFechaNacimiento.pipe(cleanBlank,ifEmpty)
      this.obsDireccion  = this.subDireccion.pipe(cleanBlank,ifEmpty)
      this.obsTelefono = this.subTelefono.pipe(cleanBlank,ifEmpty)
      this.obsCelular = this.subCelular.pipe(cleanBlank,ifEmpty)
      this.obsUsuario = this.subUsuario.pipe(cleanBlank,ifEmpty)
      this.obsPassword = this.subPassword.pipe(cleanBlank,ifEmpty)
      this.obsEmpresa =  this.subEmpresa.pipe(cleanBlank,ifEmpty)
      this.obsRol =  this.subRol.pipe(cleanBlank,ifEmpty)

      combineLatest(
        this.obsTipoDocumento.pipe(validObs),
        this.obsNumeroDocumento.pipe(validObs),
        this.obsNombres.pipe(validObs),
        this.obsApellidos.pipe(validObs),
        this.obsTipoPersona.pipe(validObs),
        this.obsSexo.pipe(validObs),
        this.obsEstadoCivil.pipe(validObs),
        this.obsFechaNacimiento.pipe(validObs),
        this.obsDireccion.pipe(validObs),
        this.obsTelefono.pipe(validObs),
        this.obsCelular.pipe(validObs),
        this.obsUsuario.pipe(validObs),
        this.obsPassword.pipe(validObs),
        this.obsEmpresa.pipe(validObs),
        this.obsRol.pipe(validObs)
      ).subscribe(() => this.click$ =  true )

      if(this.click$){
        return true
      }
      return false
  }

}
