import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'
import axios from 'axios'

export default class Login extends Component {
  state = {
    username: '',
    userpw: '',
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
        <div className="input-field">
          <TextField label="username" onChange={(e) => this.onUsernameChange(e)}/>
          <TextField label="password" onChange={(e) => this.onPasswordChange(e)}/>
        </div>

        <div>
          {this.state.username}
        </div>

        <div onClick={() => this.login()} style={{cursor: 'pointer'}}>
          Login
        </div>
      </div>
    )
  }
}