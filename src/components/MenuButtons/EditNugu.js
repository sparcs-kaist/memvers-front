import React, { Component } from 'react'
import axios from 'axios';

import EditNuguStyle from './EditNugu.css'
import { TextField, Button, Checkbox } from '@material-ui/core';

import defaultStyle from './default.css'

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
      console.log(err)
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
        <span className={defaultStyle.description}>
          Nugu 정보를 편집합니다. 아래의 정보는 Nugu 에서 나의 이름 / 아이디를 검색할 경우 노출됩니다. 또한 SPARCS 공식 홈페이지의 멤버 란에도 노출됩니다. 만약 SPARCS 공식 홈페이지에 노출되는 것을 원하지 않는다면, 비공개 여부를 설정할 수 있습니다.
        </span>
        <div style={{height: 20}}></div>
        {this.renderContent()}
        <Button
          variant="contained"
          color="primary"
          style={{width: '100%', boxShadow: 'none', marginTop: 10}}
          onClick={this.save}
        >
          저장
        </Button>
      </div>
    )
  }
}
