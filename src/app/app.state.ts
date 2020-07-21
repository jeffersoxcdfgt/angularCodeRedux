import * as fromRoles from './roles/store/reducers/roles.reducers';
import * as fromZonas from './zonas/store/reducers/zonas.reducers';
import * as fromIvas from './ivas/store/reducers/ivas.reducers';
import * as fromSectores from './sectores/store/reducers/sectores.reducers';
import * as fromEmpresas from './empresas/store/reducers/empresas.reducers';
import * as fromPersonas from './personas/store/reducers/personas.reducers';
import * as fromContratos from './contratos/store/reducers/contratos.reducers';
import * as fromServicios from './servicios/store/reducers/servicios.reducers';


export interface AppState {
  roles:fromRoles.State;
  zonas:fromZonas.State;
  ivas:fromZonas.State;
  sectores:fromZonas.State;
  empresas:fromEmpresas.State;
  personas:fromPersonas.State;
  contratos:fromContratos.State;
  servicios:fromServicios.State;
}
