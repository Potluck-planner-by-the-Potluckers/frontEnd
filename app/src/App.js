// https://github.com/Potluck-planner-by-the-Potluckers/frontEnd
import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
// components
import Dashboard from './components/Dashboard'
import CreatePotluckForm from './components/CreatePotluckForm'
function App() {
  return (
    <div className="App">

      <Switch>
        {/* will be private route soon */}
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/login'>
          {/* <Login /> */}
        </Route>
        <Route path='/singup'>
          {/* <SignUp /> */}
        </Route>
        <Route path='/newpotluckform'>
          <CreatePotluckForm />
        </Route>
        <Route path='/'>
          {/* <SignUp /> */}
        </Route>
      </Switch>


    </div>
  );
}

export default App;
