import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

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

import CreateComponent from './pages/component/CreateComponent';
import EditComponent from './pages/component/EditComponent';
import ListComponent from './pages/component/ListComponent';
import ShowComponent from './pages/component/ShowComponent';

import Login from './pages/auth/Login';
import Home from './pages/home/Home';

import AuthService from './services/AuthService';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    AuthService.logged() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{pathname: '/', state: {from: props.location}}}/>
    )
  )} />
);

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={AuthService.logout} />

        <PrivateRoute exact path="/home" component={Home} />

        <PrivateRoute exact path="/usuarios" component={ListUser} />
        <PrivateRoute exact path="/usuario/:user_id" component={ShowUser} />
        <PrivateRoute exact path="/cadastrar-usuario" component={CreateUser} />
        <PrivateRoute exact path="/editar-usuario/:user_id" component={EditUser} />
        
        <PrivateRoute exact path="/equipamentos" component={ListEquipment} />
        <PrivateRoute exact path="/equipamento/:equipment_id" component={ShowEquipment} />
        <PrivateRoute exact path="/cadastrar-equipamento" component={CreateEquipament} />
        <PrivateRoute exact path="/editar-equipamento/:equipment_id" component={EditEquipment} />

        <PrivateRoute exact path="/componentes" component={ListComponent} />
        <PrivateRoute exact path="/componente/:component_id" component={ShowComponent} />
        <PrivateRoute exact path="/cadastrar-componente" component={CreateComponent} />
        <PrivateRoute exact path="/editar-componente/:component_id" component={EditComponent} />
        
        <PrivateRoute exact path="/manutencao" component={ListMaintenance} />
        <PrivateRoute exact path="/manutencao/:maintenance_id" component={ShowMaintenance} />
        <PrivateRoute exact path="/cadastrar-manutencao" component={CreateMaintenance} />
        <PrivateRoute exact path="/editar-manutencao/:maintenance_id" component={EditMaintenance} />
      </Switch>
    </BrowserRouter>
  );
}