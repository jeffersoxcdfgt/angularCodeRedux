import * as fromRoles from './roles/store/reducers/roles.reducers';
import * as fromZonas from './zonas/store/reducers/zonas.reducers';
import * as fromIvas from './ivas/store/reducers/ivas.reducers';
import * as fromSectores from './sectores/store/reducers/sectores.reducers';
import * as fromEmpresas from './empresas/store/reducers/empresas.reducers';
import * as fromPersonas from './personas/store/reducers/personas.reducers';
import * as fromContratos from './contratos/store/reducers/contratos.reducers';
import * as fromServicios from './servicios/store/reducers/servicios.reducers';
import * as fromDepartamentos from './departamentos/store/reducers/departamentos.reducers';
import * as fromMunicipios from './municipios/store/reducers/municipios.reducers';
import * as fromFacturas from './facturas/store/reducers/facturas.reducers';
import * as fromOrdenesServicios from './orden-servicios/store/reducers/orden-servicios.reducers';
import * as fromPersonasSolidarias from './persona-solidarias/store/reducers/personasSolidarias.reducers';
import * as fromFormaPagos from './forma-pagos/store/reducers/formaPagos.reducers';
import * as fromUsuarios from './usuarios/store/reducers/usuarios.reducers';


export interface AppState {
  roles:fromRoles.State;
  zonas:fromZonas.State;
  ivas:fromZonas.State;
  sectores:fromZonas.State;
  empresas:fromEmpresas.State;
  personas:fromPersonas.State;
  contratos:fromContratos.State;
  servicios:fromServicios.State;
  departamentos:fromDepartamentos.State;
  municipios:fromMunicipios.State;
  facturas:fromFacturas.State;
  ordenesservicios:fromOrdenesServicios.State;
  personassolidarias:fromPersonasSolidarias.State;
  formaspagos:fromFormaPagos.State;
  usuarios:fromUsuarios.State;
}
