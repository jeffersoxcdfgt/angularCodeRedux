import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Usuario } from '../shared/usuario';
import { Observable , from } from 'rxjs';
import { tap , distinct , toArray} from 'rxjs/operators';
import  * as  usuariosActions from '../store/actions/usuarios.actions';
import { getAllUsuarios } from '../store/reducers/usuarios.reducers';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {
  usuarios : Observable<Usuario[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.usuarios = this.store.select(getAllUsuarios);
    this.usuarios.subscribe( data =>{
      console.log("usuarios");
      console.log(data)
    });
  }

}
