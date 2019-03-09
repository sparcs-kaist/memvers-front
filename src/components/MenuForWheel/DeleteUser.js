import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

export default class DeleteUser extends Component {
  state = {
    verifyText: '삭제하겠습니다.',
    userInput: '',
    userName: '',
  }

  handleChange = (e, value) => {
    if (value == 'name') this.setState({ userName: e.target.value })
    else if (value == 'verify') this.setState({ userInput: e.target.value })
  }

  delete = async () => {
    const { verifyText, userInput, userName } = this.state
    if (verifyText == userInput) {
      try {
        const payload = await axios.post('https://memvers-api.sparcs.org/api/wheel/delete', {un: userName}, {withCredentials: true})
        if (payload.data.expired) window.location.href = '/login'
        else if (payload.data.result) alert('Delete success.')
        else alert('No such user')
      } catch (error) {
        alert(error)
      }
    } else {
      alert('Text does not match.')
    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <TextField 
          label="ID"
          onChange={(e) => this.handleChange(e, 'name')}
        />
        <div>
          삭제를 원할 경우, 아래 문구를 입력하세요.
        </div>
        <TextField
          label="삭제하겠습니다."
          onChange={(e) => this.handleChange(e, 'verify')}
        />
        <Button
          onClick={this.delete}
        >
          삭제
        </Button>
      </div>
    )
  }
}
