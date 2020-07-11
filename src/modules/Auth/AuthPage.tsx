import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from './Login'
import RegisterPage from './Register'

const AuthPage = () => {
  return (
    <Switch>
      <Route path="/auth/login" component={LoginPage} />
      <Route path="/auth/register" component={RegisterPage} />
      <Redirect to="/auth/login" />
    </Switch>
  )
}

export default AuthPage
