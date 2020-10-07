import { Component  } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <nav class="navbar navbar-default navbar-fixed-top" id="navbar">
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
  </nav>
  <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SAES aplication for Telecomunication';

}
