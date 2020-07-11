import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AuthPage from './modules/Auth'
import LoggedInPage from './modules/LoggedIn'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <Route path="/" component={LoggedInPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
