import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';

import AddUserStyle from './AddUser.css'
import axios from 'axios';

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
    if (password != cpassword) {
      alert('Not equal password')
      return
    }
    const queryBody = {
      un: id,
      name,
      npass: password
    }
    try {
      const payload = await axios.post('https://memvers-api.sparcs.org/api/wheel/add', queryBody, {withCredentials: true})
      if (payload.data.expired) window.location.href = '/login'
      else if (payload.data.result) alert('Add success')
      else if (payload.data.weak) alert('Weak password')
      else alert('The user already exist')
    } catch (error) {
      alert(error)
    }
  }

  render() {
    return (
      <div className={AddUserStyle.container}>
        <TextField
          label="ID"
          onChange={(e) => this.handleChange(e, 'id')}
        />
        <TextField
          label="이름"
          onChange={(e) => this.handleChange(e, 'name')}
        />
        <TextField
          label="비밀번호"
          onChange={(e) => this.handleChange(e, 'password')}
          type="password"
        />
        <TextField
          label="비밀번호 확인"
          onChange={(e) => this.handleChange(e, 'cpassword')}
          type="password"
        />
        <Button
          onClick={this.add}
        >
          등록
        </Button>

      </div>
    )
  }
}