import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';

//import Welcome from '././components/Welcome/Welcome';
//import Home from '././components/Home/Home';
import Customers from '././components/Customers/Customers';
import AddCustomer from '././components/Customers/AddCustomer';
import EditCustomer from '././components/Customers/EditCustomer';
import Login from '././components/Login/Login';
import Signup from '././components/Signup/Signup';
import NotFound from '././components/NotFound/NotFound';
import Test from '././components/Test/Test';


const Routes = () => (
  <BrowserRouter >
      <Switch>
          <Route exact path="/" component={Customers}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/customers" component={Customers}/>
          <Route exact path="/test" component={Test}/>
          <Route exact path="/customer/add" component={AddCustomer}/>
          <Route exact path="/customer/edit/:id" component={EditCustomer}/>
          <Route exact path="*" component={NotFound}/>
      </Switch>
  </BrowserRouter>
);

export default Routes;