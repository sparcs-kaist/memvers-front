import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import api from '../../api'
import defaultStyle from '../MenuButtons/default.css'

export default class ChangePassword extends Component {
  state = {
    id: '',
    newPassword: '',
    confirmPassword: '',
  }

  changePassword = async () => {
    const { id, newPassword, confirmPassword } = this.state
    if (newPassword !== confirmPassword) {
      alert('Password does not match.')
      return
    }
    const queryBody = { npass: newPassword }

    try {
      const { data, notLoggedIn } = await api.post(`/passwd/admin/${id}`, queryBody)
      if (notLoggedIn) return

      if (data.success) {
        alert('Update success.')
        this.setState({
          id: '',
          newPassword: '',
          confirmPassword: '',
        })
        return
      }

      switch (data.error) {
        case 0:
          alert('User doesn\'t exist')
          return

        case 1:
          alert('Password Too weak (length >= 8, Password cannot include username)')
          return

        default:
          throw new Error(`Unknown Error: ${JSON.stringify(data)}`)
      }
    } catch (err) {
      alert(err)
    }
  }

  handleChange = (e, input) => {
    if (input == 'id') {
      this.setState({
        id: e.target.value
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
          스팍스 회원의 비밀번호를 변경할 수 있습니다. 8자 이상의 비밀번호를 입력하세요.
        </span>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <TextField
            label="ID"
            onChange={(e) => this.handleChange(e, 'id')}
            style={{margin: '10px 0px'}}
            value={this.state.id}
          />
          <TextField
            label="새 비밀번호"
            type="password"
            onChange={(e) => this.handleChange(e, 'new')}
            style={{marginBottom: 10}}
            value={this.state.newPassword}
          />
          <TextField
            label="새 비밀번호 재입력"
            type="password"
            onChange={(e) => this.handleChange(e, 'confirm')}
            value={this.state.confirmPassword}
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
