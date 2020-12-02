import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import CreateUser from './pages/user/CreateUser';
import EditUser from './pages/user/EditUser';
import ListUser from './pages/user/ListUser';
import ShowUser from './pages/user/ShowUser';

import CreateEquipament from './pages/equipment/CreateEquipment';
import EditEquipment from './pages/equipment/EditEquipment';
import ListEquipment from './pages/equipment/ListEquipment';
import ShowEquipment from './pages/equipment/ShowEquipment';

import CreateMaintenance from './pages/maintenance/CreateMaintenance';
import EditMaintenance from './pages/maintenance/EditMaintenance';
import ListMaintenance from './pages/maintenance/ListMaintenance';
import ShowMaintenance from './pages/maintenance/ShowMaintenance';

import Login from './pages/auth/Login';

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/usuarios" component={ListUser} />
        <Route exact path="/usuario/:user_id" component={ShowUser} />
        <Route exact path="/cadastrar-usuario" component={CreateUser} />
        <Route exact path="/editar-usuario/:user_id" component={EditUser} />
        
        <Route exact path="/equipamentos" component={ListEquipment} />
        <Route exact path="/equipamento/:equipment_id" component={ShowEquipment} />
        <Route exact path="/cadastrar-equipamento" component={CreateEquipament} />
        <Route exact path="/editar-equipamento/:equipment_id" component={EditEquipment} />
        
        <Route exact path="/manutencao" component={ListMaintenance} />
        <Route exact path="/manutencao/:maintenance_id" component={ShowMaintenance} />
        <Route exact path="/cadastrar-manutencao" component={CreateMaintenance} />
        <Route exact path="/editar-manutencao/:maintenance_id" component={EditMaintenance} />
      </Switch>
    </BrowserRouter>
  );
}