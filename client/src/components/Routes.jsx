import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Signup from './signup'
import Home from './Home'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  )
}

export default Routes
