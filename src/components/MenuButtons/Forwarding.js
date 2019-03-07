import React, { Component } from 'react'
import axios from 'axios';

import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button'

export default class Forwarding extends Component {
  state = {
    mail: ''
  }
  
  save = async () => {
    const { mail } = this.state;
    try {
      const payload = await axios.post('https://memvers-api.sparcs.org/api/forward', {mail: mail}, {withCredentials: true})
      if (payload.data.expired) this.props.history.push('/')
      else if (payload.data.result) {
        alert('Update success')
      } else {
        alert('Update failed')
      }
    } catch (err) {
      alert(err)
    }
  }
  
  render() {
    return (
      <div>
        <TextField
          label="메일"
          onChange={(e) => this.setState({mail: e.target.value})}
        />
        <Button
          onClick={() => this.save()}
        >
          설정
        </Button>
      </div>
    )
  }
}
