import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios';

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
          this.props.history.push('/')
        } else if (payload.data.result) {
          alert('Update success')
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
      <div>
        비밀번호를 변경할 수 있습니다. 8자 이상의 비밀번호를 입력하세요.
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <TextField
            label="현재 비밀번호"
            type="password"
            onChange={(e) => this.handleChange(e, 'current')}
          />
          <TextField
            label="새 비밀번호"
            type="password"
            onChange={(e) => this.handleChange(e, 'new')}
          />
          <TextField
            label="새 비밀번호 재입력"
            type="password"
            onChange={(e) => this.handleChange(e, 'confirm')}
          />
        </div>
        <Button onClick={() => this.changePassword()}>
          비밀번호 변경
        </Button>
      </div>
    )
  }
}
