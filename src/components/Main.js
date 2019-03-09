import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './Login'
import Menu from './Menu'

import MainStyle from './Main.css'

const Main = () => {
  return (
    <div className={MainStyle.mainContainer}>
      <div className={MainStyle.header}>
        <div style={{marginLeft: 10}}>
          Memvers
        </div>
      </div>
      <div className={MainStyle.contentContainer}>
        <Switch>
          <Route path="/menu" component={Menu} />
          <Route path="/login" component={Login} />
          <Route path="/" render={props => <Redirect to="/login" />} />
        </Switch>
      </div>
    </div>
  )
}

export default Main