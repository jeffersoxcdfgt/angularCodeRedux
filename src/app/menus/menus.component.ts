import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { GetAllMenus } from './store/actions/menus.actions';
import { getMenusError } from './store/reducers/menus.reducers';

@Component({
  selector:'app-menus',
  template:`<nav class="navbar navbar-default navbar-fixed-top" id="navbar">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">
          <!--<img alt="SAES Database" src="./nba_logo.png">-->
          <strong class="hidden-xs hidden-sm">SAES</strong></a> <button aria-controls="navbar" aria-expanded="false" class="navbar-toggle collapsed" data-target="#navnav" data-toggle="collapse" type="button"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button>
      </div>
      <div class="navbar-collapse collapse" id="navnav">
        <ul class="nav navbar-nav navbar-right" id="nav-menu">
          <li class="dropdown">
            <a aria-expanded="false" aria-haspopup="true" class="dropdown-toggle" data-toggle="dropdown" href="#" role="button"><i class="icon-user"></i> admin <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li class="divider" role="separator"></li>
              <li>
                <a href="#" id="self-change-password" title="Cambiar contraseña">Cambiar contraseña</a>
              </li>
              <li>
                <a href="#">Salir</a>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav">
          <li class="dropdown">
            <a aria-expanded="false" aria-haspopup="true" class="dropdown-toggle" data-toggle="dropdown" href="#" role="button">
                  Sistema <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a routerLink="/roles" title="Roles">Roles</a>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav">
          <li class="dropdown">
            <a aria-expanded="false" aria-haspopup="true" class="dropdown-toggle" data-toggle="dropdown" href="#" role="button">
               Información Basica <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a routerLink="/personas" title="Personas">Personas</a>
              </li>
              <li>
                <a routerLink="/zonas" title="Zonas">Zonas</a>
              </li>
              <li>
                <a routerLink="/sectores" title="Sectores">Sectores</a>
              </li>
              <li>
                <a routerLink="/ivas" title="Iva">Iva</a>
              </li>
              <li role="separator" class="divider"></li>
              <li>
                <a routerLink="/empresas" title="Empresa">Empresa</a>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav">
          <li class="dropdown">
            <a aria-expanded="false" aria-haspopup="true" class="dropdown-toggle" data-toggle="dropdown" href="#" role="button">
                  Servicios <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a routerLink="/contratos"  title="Contratos">Contratos</a>
              </li>
              <li>
                <a  routerLink="/servicios"  title="Servicios">Servicios</a>
              </li>
              <li>
                <a  routerLink="/facturas"  title="Servicios">Factura Servicios</a>
              </li>
              <li>
                <a  routerLink="/ordenesservicios"  title="Orden Servicios">Orden Servicios</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>`,
  styleUrls:['./menus.component.css']
})
export class MenusComponent implements OnInit {

  constructor(private router: Router , private store :Store<AppState>){
  }

  ngOnInit(){

    // subscriptions when success or error action
    this.store.select(getMenusError).subscribe((error) => this.loadingError(error));
    this.store.dispatch(new GetAllMenus());

  }

  /**
   * Display error message if load of menus fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of menus');
    }
  }

  /**
   * Display success message after execute specific action over the menu
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      this.router.navigate(['/menus']);
    }
  }

  /**
   * Display error message is execution of action fails
   * @param error the error thrown
   * @param message the message to be displayed
   */
  actionError(error, message: string) {
    if (error) {
      alert(message);
    }
  }

}
