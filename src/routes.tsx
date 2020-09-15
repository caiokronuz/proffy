import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Landing from './pages/Landing';

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={LoginPage} />
            <Route path="/landing" component={Landing} />
            <Route path="/study" component={TeacherList} />
            <Route path="/give-classes" component={TeacherForm} />
        </BrowserRouter>
    );
}

export default Routes;