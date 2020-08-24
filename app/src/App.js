// https://github.com/Potluck-planner-by-the-Potluckers/frontEnd
import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
// components
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="App">

      <Switch>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/login'>
          {/* <Login /> */}
        </Route>
        <Route path='/singup'>
          {/* <SignUp /> */}
        </Route>
      </Switch>


    </div>
  );
}

export default App;
