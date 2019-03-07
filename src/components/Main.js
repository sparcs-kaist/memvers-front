import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './Login'
import Menu from './Menu'

const Main = () => {
  return (
      <Switch>
        <Route path="/menu" component={Menu} />
        <Route path="/login" component={Login} />
        <Route path="/" render={props => <Redirect to="/login" />} />
      </Switch>
    )
}

export default Main