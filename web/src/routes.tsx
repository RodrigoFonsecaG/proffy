import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherForm from './pages/TeacherForm';
import TeacherList from './pages/TeacherList';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

function Routes(){
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/home" exact component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
    </BrowserRouter>
  );
}

export default Routes;