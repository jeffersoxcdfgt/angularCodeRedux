import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector:'app-usuarios',
  template:`
  <router-outlet></router-outlet>`,
  styleUrls:['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(){
  }

  ngOnInit(){

  }

}
