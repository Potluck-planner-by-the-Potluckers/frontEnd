// https://github.com/Potluck-planner-by-the-Potluckers/frontEnd
import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
// components
import Dashboard from './components/Dashboard'
import CreatePotluckForm from './components/CreatePotluckForm'
import EditYourPotlucker from './components/EditYourPotlucker'
import PublicPotluck from './components/PublicPotluck'
import ConfirmationForm from './components/ConfirmationForm'
import Login from './components/Login'
function App() {
  return (
    <div className="App">

      <Router>
        <Switch>
          {/* will be private route soon */}
          <Route exact path='/'>
            {/* /dashboard */}
            <Dashboard />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            {/* <SignUp /> */}
          </Route>
          <Route path='/newpotluckform'>
            <CreatePotluckForm />
          </Route>
          <Route path='/edityourpotlock/:id'>
            <EditYourPotlucker />
          </Route>
          <Route exact path='/:id/:urlPotluckName'>
            <PublicPotluck />
          </Route>
          <Route exact path='/:id/:urlPotluckName/confirmation'>
            <ConfirmationForm />
          </Route>
        </Switch>
      </Router>


    </div>
  );
}

export default App;
