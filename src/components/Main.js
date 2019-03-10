import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './Login'
import Menu from './Menu'

import MainStyle from './Main.css'

export default class Main extends Component {
  state = {
    scrolled: MainStyle.header,
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.checkScroll)
  }

  checkScroll = () => {
    if (window.pageYOffset > 0) {
      this.setState({ scrolled: MainStyle.headerShadow })
    } else {
      this.setState({ scrolled: MainStyle.header })
    }
  }

  render() {
    return (
      <div className={MainStyle.mainContainer}>
        <div className={MainStyle.header}>
          <img src={require('../images/memvers-logo.png')} className={MainStyle.logo} alt="memvers logo"/>
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
}