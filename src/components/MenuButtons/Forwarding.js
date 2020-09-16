import React, { Component } from 'react'

import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'

import api from '../../api'
import defaultStyle from './default.css'

export default class Forwarding extends Component {
  state = {
    mail: ''
  }

  componentDidMount = async () => {
    try {
      const { notLoggedIn, data } = await api.get('/forward')
      if (notLoggedIn) return

      const { mail } = data
      this.setState({ mail })
    } catch (error) {
      alert(error)
    }
  }

  save = async () => {
    const { mail } = this.state;
    try {
      const { notLoggedIn, data } = await api.post('/forward', { mail })
      if (notLoggedIn) return

      if (data.success) {
        alert('Update success')
        return
      }

      throw new Error(`Unknown Error: ${JSON.stringify(data)}`)
    } catch (err) {
      alert(err)
    }
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        <span className={defaultStyle.description}>
          포워딩 이메일을 설정할 수 있습니다. sparcs.org 메일로 전송되는 이메일은 모두 아래의 이메일로 포워딩 됩니다.
        </span>
        <TextField
          style={{width: '100%', marginTop: 20}}
          label="포워딩 받을 메일"
          value={this.state.mail}
          onChange={(e) => this.setState({mail: e.target.value})}
        />
        <Button
          variant="contained"
          color="primary"
          style={{width: '100%', boxShadow: 'none', marginTop: 10}}
          onClick={() => this.save()}
        >
          설정
        </Button>
      </div>
    )
  }
}
