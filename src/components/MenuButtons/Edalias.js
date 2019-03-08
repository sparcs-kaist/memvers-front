import React, { Component } from 'react'
import axios from 'axios';

import EdaliasStyle from './Edalias.css'
import { Checkbox, Button } from '@material-ui/core';

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
      const payload = await axios.get('https://memvers-api.sparcs.org/api/edalias', {withCredentials: true})
      if (payload.data.expired) window.location.href =('/login')
      else {
        this.setState({
          ...payload.data
        })
      }
    } catch (err) {
      alert(err)
    }
  }

  save = async () => {
    const { added, removed } = this.state
    try {
      const payload = await axios.post('https://memvers-api.sparcs.org/api/edalias', { added, removed }, {withCredentials: true})
      if (payload.data.expired) window.location.href = '/login'
      else if (payload.data.result) alert('Update success')
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
