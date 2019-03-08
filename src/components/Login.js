import React, { Component } from 'react'
import axios from 'axios'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import LoginStyle from './Login.css'
export default class Login extends Component {
  state = {
    username: '',
    userpw: '',
  }

  componentDidMount = async () => {
    try {
      const payload = await axios.get('https://memvers-api.sparcs.org/api/un', {withCredentials: true})
      if (!payload.data.expired) this.props.history.push('/menu')
    } catch (error) {
      alert(error)
    }
  }

  onUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  isEnter = (e) => {
    if (e.key == 'Enter') {
      this.login();
    }
  }

  onPasswordChange = (e) => {
    this.setState({
      userpw: e.target.value
    })
  }

  login = async () => {
    const { username, userpw } = this.state
    const queryObject = {
      un: username,
      pw: userpw,
    }

    try {
      const payload = await axios.post('https://memvers-api.sparcs.org/api/login', queryObject, {withCredentials: true})
      if (payload.data.result) {
        this.props.history.push('/menu')
      } else {
        alert("Login failed")
      }
    } catch (err) {
      alert(err)
    }
  }

  render() {
    return (
      <div onKeyPress={this.isEnter}>
        <div className={LoginStyle.inputField}>
          <TextField label="username" onChange={(e) => this.onUsernameChange(e)}/>
          <TextField type="password" label="password" onChange={(e) => this.onPasswordChange(e)}/>
        </div>
        <Button
          className={LoginStyle.button}
          onClick={() => this.login()}
        >
          Login
        </Button>
      </div>
    )
  }
}