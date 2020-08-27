// https://github.com/Potluck-planner-by-the-Potluckers/frontEnd
import React from 'react';
import './App.css';
import {  Route, Switch, BrowserRouter as Router } from 'react-router-dom'
// components
import Dashboard from './components/Dashboard'
import CreatePotluckForm from './components/CreatePotluckForm'
import EditYourPotlucker from './components/EditYourPotlucker'
function App() {
  return (
    <div className="App">


      <Router>
        <Switch>
          {/* will be private route soon */}
          <Route  exact path='/'>
            {/* /dashboard */}
            <Dashboard />
          </Route>
          <Route path='/login'>
            {/* <Login /> */}
          </Route>
          <Route path='/singup'>
            {/* <SignUp /> */}
          </Route>
          <div className="Create">
          <Route path='/newpotluckform'>
            <CreatePotluckForm />
          </Route>
          </div>
          <Route path='/edityourpotlock/:id'>
            <EditYourPotlucker />
          </Route>
        </Switch>
      </Router>



    </div>
  );
}

export default App;
