import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthContext } from './contexts/authContext'
import Signup from './components/signup'
import Home from './components/Home'

const App = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/">{isAuthenticated ? <Home /> : <Signup />}</Route>
      </Switch>
    </Router>
  )
}

export default App
