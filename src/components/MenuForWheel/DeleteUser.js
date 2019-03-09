import React, { Component } from 'react'
import { TextField } from '@material-ui/core';

export default class DeleteUser extends Component {
  state = {
    verifyText: '삭제하겠습니다.',
    userInput: '',
    userName: '',
  }

  handleChange = (e, value) => {
    if (value == 'name') this.setState({ username: e.target.value })
    else if (value == 'verity') this.setState({ userInput: e.target.value })
  }

  render() {
    return (
      <div>
        <TextField 
          value={this.state.userName}
          onChange={(e) => this.handleChange(e, 'name')}
        />
        <div>
          삭제를 원할 경우, 아래 문구를 입력하세요.
          {this.state.verifyText}
        </div>
        <TextField
          onChange={(e) => this.handleChange(e, 'verify')}
        />
      </div>
    )
  }
}
