import React, { Component } from 'react'

import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'

import CListStyle from './CreateList.css'

import api from '../../api'
import defaultStyle from './default.css'

export default class CreateList extends Component {
  state = {
    name: '',
    description: '',
    hidden: false
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
    } else if (input == 'isHidden') {
      this.setState({
        isHidden: e.target.checked
      })
    }
  }

  createList = async () => {
    const { name, description, isHidden } = this.state;
    const queryBody = {
      desc: description,
      isHidden
    }

    if (!this.acceptable(name)) {
      alert('Cannot use this name!')
      return
    }
    
    try {
      const { data, notLoggedIn } = await api.put(`/mailing/${name}`, queryBody)
      if (notLoggedIn) return

      if (data.success) {
        alert('Succesfully created')
        return
      }

      switch (data.error) {
        case 0:
          alert('The mailing list already exists!')
          return

        case 1:
          alert('Internal Server Error')
          return

        case 2:
          alert('Description is not given')
          return

        default:
          throw new Error(`Unknown error: ${JSON.stringify(data)}`)
      }
    } catch (err) {
      alert(err)
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
          {
            this.props.isWheel &&
            <div style={{marginTop: 10}}>
              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    checked={this.state.isHidden}
                    onChange={() => this.handleChange(e, 'isHidden')}
                  />
                }
                label="숨겨진 메일링 리스트로 설정"
                labelPlacement="end"
              />
            </div>
          }
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
