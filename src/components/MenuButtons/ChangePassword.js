import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios';

import defaultStyle from './default.css'

export default class ChangePassword extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

  changePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = this.state
    if (newPassword == confirmPassword) {
      const queryBody = {
        opass: oldPassword,
        npass: newPassword
      }
      try {
        const payload = await axios.post('https://memvers-api.sparcs.org/api/passwd', queryBody, {withCredentials: true})
        if (payload.data.expired) {
          window.location.href = '/login'
        } else if (payload.data.result) {
          alert('Update success. Please login again.')
          axios.get('https://memvers-api.sparcs.org/api/logout', {withCredentials: true})
          .then(
            window.location.href = '/login'
          )
        } else if (payload.data.weak) {
          alert('Too weak')
        } else {
          alert('Wrong password')
        }
      } catch (err) {
        alert(err)
      }
    } else {
      alert("Password does not match.")
    }
  }

  handleChange = (e, input) => {
    if (input == 'current') {
      this.setState({
        oldPassword: e.target.value
      })
    } else if (input == 'new') {
      this.setState({
        newPassword: e.target.value
      })
    } else if (input == 'confirm') {
      this.setState({
        confirmPassword: e.target.value
      })
    }
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        <span className={defaultStyle.description}>
          비밀번호를 변경할 수 있습니다. 8자 이상의 비밀번호를 입력하세요.
        </span>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <TextField
            label="현재 비밀번호"
            type="password"
            onChange={(e) => this.handleChange(e, 'current')}
            style={{margin: '10px 0px'}}
          />
          <TextField
            label="새 비밀번호"
            type="password"
            onChange={(e) => this.handleChange(e, 'new')}
            style={{marginBottom: 10}}
          />
          <TextField
            label="새 비밀번호 재입력"
            type="password"
            onChange={(e) => this.handleChange(e, 'confirm')}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{boxShadow: 'none', width: '100%', marginTop: 10}}
          onClick={() => this.changePassword()}
        >
          비밀번호 변경
        </Button>
      </div>
    )
  }
}
