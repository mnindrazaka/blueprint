import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProjectPage from './Project'

const LoggedInPage = () => {
  return (
    <Switch>
      <Route path="/project" component={ProjectPage} />
      <Redirect to="/project" />
    </Switch>
  )
}

export default LoggedInPage
