import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';

import AddUserStyle from './AddUser.css'

import api from '../../api'
import defaultStyle from '../MenuButtons/default.css'

export default class AddUser extends Component {
  state = {
    id: '',
    name: '',
    password: '',
    cpassword: '',
  }

  handleChange = (e, input) => {
    if (input == "id") {
      this.setState({
        id: e.target.value
      })
    } else if (input == "name") {
      this.setState({
        name: e.target.value
      })
    } else if (input == "password") {
      this.setState({
        password: e.target.value
      })
    } else if (input == "cpassword") {
      this.setState({
        cpassword: e.target.value
      })
    }
  }

  add = async () => {
    const { id, name, password, cpassword } = this.state
    if (password !== cpassword) {
      alert('Not equal password')
      return
    }

    const queryBody = {
      name,
      npass: password
    }

    try {
      const { data, notLoggedIn } = await api.put(`/account/${id}`, queryBody)
      if (notLoggedIn) return

      if (data.success) {
        alert('Add success')
        this.setState({
          id: '',
          name: '',
          password: '',
          cpassword: '',
        })
        return
      }

      switch (data.error) {
        case 0:
          alert('The user already exist')
          return

        case 1:
          alert('Weak password (length >= 8, Password cannot include username)')
          return

        case 2:
          alert('Some field is not given')
          return

        default:
          throw new Error(`Unknown Error: ${JSON.stringify(data)}`)
      }
    } catch (error) {
      alert(error)
    }
  }

  render() {
    return (
      <div className={AddUserStyle.container}>
        <span className={defaultStyle.description}>
          새로운 회원을 추가합니다. 환영해요!
        </span>
        <TextField
          style={{width: '100%', marginTop: 10}}
          label="ID"
          onChange={(e) => this.handleChange(e, 'id')}
          value={this.state.id}
        />
        <TextField
          style={{width: '100%', marginTop: 10}}
          label="이름"
          onChange={(e) => this.handleChange(e, 'name')}
          value={this.state.name}
        />
        <TextField
          style={{width: '100%', marginTop: 10}}
          label="비밀번호"
          onChange={(e) => this.handleChange(e, 'password')}
          type="password"
          value={this.state.password}
        />
        <TextField
          style={{width: '100%', marginTop: 10}}
          label="비밀번호 확인"
          onChange={(e) => this.handleChange(e, 'cpassword')}
          type="password"
          value={this.state.cpassword}
        />
        <Button
          variant="contained"
          color="primary"
          style={{width: '100%', boxShadow: 'none', marginTop: 10}}
          onClick={this.add}
        >
          등록
        </Button>

      </div>
    )
  }
}
