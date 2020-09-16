import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';

import api from '../../api'
import defaultStyle from '../MenuButtons/default.css'

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
    if (verifyText !== userInput) {
      alert('Text does not match.')
      return
    }

    try {
      const { data, notLoggedIn } = await api.delete(`/account/${userName}`)
      if (notLoggedIn) return

      if (data.success) {
        alert('Delete success.')
        this.setState({
          userInput: '',
          userName: '',
        })

        return
      }

      alert('No such user')
    } catch (error) {
      alert(error)
    }
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        <span className={defaultStyle.description}>
          회원 정보를 삭제합니다. <span style={{color: 'red'}}>이 작업은 취소할 수 없습니다.</span>
        </span>
        <div style={{width: '100%'}}>
          <TextField
            style={{width: '100%', marginTop: 10}}
            label="ID"
            onChange={(e) => this.handleChange(e, 'name')}
            value={this.state.userName}
          />
          <div style={{margin: '20px 0px', color: 'red'}}>
            정말 삭제할까요? 삭제를 원할 경우, 아래 문구를 입력하세요.
          </div>
          <TextField
            variant="outlined"
            style={{width: '100%', marginTop: 10}}
            label="삭제하겠습니다."
            onChange={(e) => this.handleChange(e, 'verify')}
            value={this.state.userInput}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{width: '100%', marginTop: 10, boxShadow: 'none'}}
          onClick={this.delete}
        >
          삭제
        </Button>
      </div>
    )
  }
}
