import './App.css'

import {BrowserRouter, Route, Switch} from 'react-router-dom'

import { Counter } from './components/counter/Counter'
import Login from './components/auth/Login'
import Main from './Pages/Main'
import { ProtectedRoute } from './services/ProtectedRoute'
import React from 'react'
import Registration from './components/auth/Registration'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div className="App">
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <BrowserRouter>
          <Switch>
            <Route exact path='/sign-up' component={Registration}/>
            <Route exact path='/sign-in' component={Login}/>
            <ProtectedRoute exact path='/' component={Main}/>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
