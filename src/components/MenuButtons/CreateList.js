import React, { Component } from 'react'

import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'

import CListStyle from './CreateList.css'
import axios from 'axios';

import defaultStyle from './default.css'

export default class CreateList extends Component {
  state = {
    name: '',
    description: '',
  }

  isLower = (ch) => {
    return 'a' <= ch && ch <= 'z'
  }

  isDigit = (ch) => {
    return '0' <= ch && ch <= '9'
  }

  _acceptable = (ch) => {
    return this.isLower(ch) || this.isDigit(ch) || ch === '-'
  }

  acceptable = (string) => {
    for (let i = 0; i < string.length; i++) {
      if (!this._acceptable(string[i])) return false;
    }
    return true;
  }

  handleChange = (e, input) => {
    if (input == 'name') {
      this.setState({
        name: e.target.value
      })
    } else if (input == 'description') {
      this.setState({
        description: e.target.value
      })
    }
  }

  createList = async () => {
    const { name, description } = this.state;
    const queryBody = {
      name,
      desc: description
    }

    if (this.acceptable(name)) {
      try {
        const payload = await axios.post('https://memvers-api.sparcs.org/api/create', queryBody, {withCredentials: true})
        if (payload.data.expired) {
          window.location.href = '/login'
        } else if (payload.data.result) {
          alert('succesfully created')
        } else {
          alert('The list already exist.')
        }
      } catch (err) {
        alert(err)
      }
    }
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        <span className={defaultStyle.description}>
          메일링 리스트를 생성할 수 있습니다.
        </span>
        <div className={CListStyle.inputField}>
          <TextField
            style={{margin: '10px 0px'}}
            label="이름"
            onChange={(e) => this.handleChange(e, 'name')}
          />
          <TextField
            label="설명"
            onChange={(e) => this.handleChange(e, 'description')}
          />
          <Button
            variant="contained"
            color="primary"
            style={{width: '100%', marginTop: 10, boxShadow: 'none'}}
            onClick={() => this.createList()}
          >
            생성
          </Button>
        </div>
      </div>
    )
  }
}
