import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './Login'
import Menu from './Menu'

import MainStyle from './Main.css'
import defaultStyle from './default.css'

const Main = () => {
  return (
    <div className={MainStyle.mainContainer}>
      <div className={defaultStyle.header}>
        Memvers for SPARCS
      </div>
      <Switch>
        <Route path="/menu" component={Menu} />
        <Route path="/login" component={Login} />
        <Route path="/" render={props => <Redirect to="/login" />} />
      </Switch>
    </div>
  )
}

export default Main