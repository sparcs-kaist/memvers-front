import React, { Component } from 'react'
import axios from 'axios';

import EditNuguStyle from './EditNugu.css'
import { TextField, Button, Checkbox } from '@material-ui/core';

import { propertyName } from '../utils'
export default class EditNugu extends Component {
  state = {
    obj: null,
  }

  componentDidMount = async () => {
    try {
      const payload = await axios.get('https://memvers-api.sparcs.org/api/nugu', {withCredentials: true})
      if (payload.data.expired) window.location.href = '/login'
      else if (payload.data.result) {
        this.setState({ obj: payload.data.obj })
      }
    } catch (err) {
      alert(err)
    }
  }

  handleChange = (e, item) => {
    const { obj } = this.state
    obj[item] = e.target.value
    this.setState({ obj })
  }

  toggleChange = (item) => {
    const { obj } = this.state
    obj[item] = obj[item] ? 0 : 1
    this.setState({ obj })
  }

  renderContent = () => {
    const { obj } = this.state
    if (obj) {
      return Object.keys(obj).map((item, i) => {
        if (item == 'id' || item == 'created_on' || item == 'updated_on') {
          return (
            <div key={i} className={EditNuguStyle.listContainer}>
              <div className={EditNuguStyle.title}>
                {propertyName(item)}
              </div>
              <div className={EditNuguStyle.input}>
                {obj[item]}
              </div>
            </div>
          )
        } else if (item == 'is_developer' || item == 'is_designer' || item == 'is_undergraduate' || item == 'is_private') {
          return (
            <div key={i} className={EditNuguStyle.listContainer}>
              <div className={EditNuguStyle.title}>
                {propertyName(item)}
              </div>
              <Checkbox
                checked={obj[item] ? true : false}
                onChange={() => this.toggleChange(item)}
              />
            </div>
          )
        } else {
          return (
            <div key={i} className={EditNuguStyle.listContainer}>
              <div className={EditNuguStyle.title}>
                {propertyName(item)}
              </div>
              <TextField
                placeholder="입력..."
                className={EditNuguStyle.input}
                value={obj[item]}
                onChange={(e) => this.handleChange(e, item)}
              />
            </div>
          )
        }
      })
    }
  }

  save = async () => {
    const { obj } = this.state
    try {
      const payload = await axios.post('https://memvers-api.sparcs.org/api/nugu', { nobj: obj }, {withCredentials: true})
      if (payload.data.expired) window.location.href = '/login'
      else if (payload.data.result) alert('Update success.')
    } catch (error) {
      alert(error)
    }
  }

  render() {
    return (
      <div className={EditNuguStyle.container}>
        {this.renderContent()}
        <Button
          onClick={this.save}
        >
          저장
        </Button>
      </div>
    )
  }
}
