import React, { Component } from 'react'

import EdaliasStyle from './Edalias.css'
import { Checkbox, Button } from '@material-ui/core';

import api from '../api'
import defaultStyle from './default.css'

export default class Edalias extends Component {
  state = {
    all: null,
    aliases: null,
    info: null,
    added: [],
    removed: [],
  }

  componentDidMount = async () => {
    try {
      const { notLoggedIn, data } = await api.get('/mailing')
      if (notLoggedIn) return

      const { all, info, aliases } = data
      this.setState({
        all, info, aliases
      })
    } catch (err) {
      console.log(err)
    }
  }

  save = async () => {
    const { added, removed } = this.state
    try {
      const { notLoggedIn, data } = await api.post('/mailing', { added, removed })
      if (notLoggedIn) return

      if (data.success)
        alert('Update success')
      else
        throw new Error(`Failed to update: ${data}`)
    } catch (err) {
      alert(err)
    }
  }

  toggleAlias = (data) => {
    let { aliases, added, removed } = this.state
    const index1 = aliases.indexOf(data)
    const index2 = added.indexOf(data)
    const index3 = removed.indexOf(data)
    if (index1 > -1) {
      if (index3 > -1) {
        removed = removed.filter((item) => item != data)
        this.setState({ removed })
      } else {
        removed.push(data)
        this.setState({ removed })
      }
    } else {
      if (index2 > -1) {
        added = added.filter((item) => item != data)
        this.setState({ added })
      } else {
        added.push(data)
        this.setState({ added })
      }
    }
  }

  renderContent = () => {
    const { all, aliases, info, added, removed } = this.state;
    if (all && aliases && info) {
      const allComponent = all.map((data, i) => {
        return (
          <div key={i} className={EdaliasStyle.listContainer}>
            <Checkbox
              checked={(aliases.includes(data) || added.includes(data)) && !removed.includes(data)}
              className={EdaliasStyle.checkbox}
              onChange={() => this.toggleAlias(data)}
            />
            <div className={EdaliasStyle.title}>
              {data}
            </div>
            <div className={EdaliasStyle.description}>
              {info[data]}
            </div>
          </div>
        )
      })
      return allComponent
    }
  }

  render() {
    return (
      <div className={EdaliasStyle.edaContainer}>
        <span className={defaultStyle.description}>
          구독할 이메일 목록(메일링 리스트)을 설정할 수 있습니다. 해당하는 이름으로 전송되는 이메일을 받아봅니다.
        </span>
        {this.renderContent()}
        <Button
          variant="contained"
          color="primary"
          style={{marginTop: 10, boxShadow: 'none'}}
          onClick={this.save}
        >
          저장
        </Button>
      </div>
    )
  }
}
