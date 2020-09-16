import React, { Component } from 'react'
import { loginApi } from '../api'

import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import LoginStyle from './Login.css'
export default class Login extends Component {
  state = {
    username: '',
    userpw: '',
    isLoading: false,
  }

  componentDidMount = async () => {
    try {
      const { status } = await loginApi.get('/un')
      if (status === 200) window.location.href = '/menu'
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
    await this.setState({ isLoading: true })
    const { username, userpw } = this.state
    const queryObject = {
      un: username,
      pw: userpw,
    }

    try {
      const { success } = await loginApi.post('/login', queryObject)
      if (success) {
        this.props.history.push('/menu')
        return;
      }

      alert("Login failed")
      this.setState({ isLoading: false })
    } catch (err) {
      alert(err)
      this.setState({ isLoading: false })
    }
  }

  render() {
    return (
      <div className={LoginStyle.container} onKeyPress={this.isEnter}>
        <div className={LoginStyle.title}>
          로그인
        </div>
        <div className={LoginStyle.inputField}>
          <TextField
            label="ID"
            onChange={(e) => this.onUsernameChange(e)}
            style={{marginBottom: 10, width: 300}}
            variant="outlined"
          />
          <TextField
            type="password"
            label="Password"
            onChange={(e) => this.onPasswordChange(e)}
            style={{marginBottom: 10, width: 300}}
            variant="outlined"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{width: '100%', boxShadow: 'none', backgroundColor: 'orange'}}
          onClick={() => this.login()}
        >
          {
            this.state.isLoading
            ? (
                <CircularProgress
                  color="white"
                  size={24}
                />
              ) : (
                'SPARCS 회원 인증'
            )
          }
        </Button>
      </div>
    )
  }
}
