import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import CreateUser from './pages/user/CreateUser';
import EditUser from './pages/user/EditUser';
import CreateEquipament from './pages/equipment/CreateEquipment';
import EditEquipment from './pages/equipment/EditEquipment';
import CreateMaintenance from './pages/maintenance/CreateMaintenance';
import EditMaintenance from './pages/maintenance/EditMaintenance';

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/cadastrar-usuario" component={CreateUser} />
        <Route exact path="/editar-usuario/:user_id" component={EditUser} />
        
        <Route exact path="/cadastrar-equipamento" component={CreateEquipament} />
        <Route exact path="/editar-equipamento/:equipment_id" component={EditEquipment} />
        
        <Route exact path="/cadastrar-manutencao" component={CreateMaintenance} />
        <Route exact path="/editar-manutencao/:maintenance_id" component={EditMaintenance} />
      </Switch>
    </BrowserRouter>
  );
}