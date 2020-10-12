import React, { Component } from 'react'

import EdaliasStyle from './Edalias.css'
import { Checkbox, Button } from '@material-ui/core'

import api from '../../api'
import defaultStyle from './default.css'

export default class Edalias extends Component {
  state = {
    all: null,
    aliases: null,
    added: [],
    removed: [],
  }

  fetchMailingList = async () => {
    try {
      const { notLoggedIn, data } = await api.get('/mailing')
      if (notLoggedIn) return

      const { all, aliases } = data
      this.setState({
        all,
        aliases,
        added: [],
        removed: []
      })
    } catch (err) {
      alert(err)
    }
  }
  
  componentDidMount = async () => {
    await this.fetchMailingList()
  }

  save = async () => {
    const { added, removed } = this.state
    try {
      const { notLoggedIn, data } = await api.post('/mailing', { added, removed })
      if (notLoggedIn) return
      
      if (data.success) {
        await this.fetchMailingList()
        alert('Update success')
      } else {
        throw new Error(`Failed to update: ${data}`)
      }
    } catch (err) {
      alert(err)
    }
  }

  toggleAlias = (data) => {
    let { aliases, added, removed } = this.state
    
    const subscribed = aliases.includes(data)
    const willSubscribe = added.includes(data)
    const willUnsubscribe = removed.includes(data)
    
    if (subscribed) {
      if (willUnsubscribe) {
        removed = removed.filter(item => item !== data)
      } else {
        removed = removed.concat(data)
      }
      
      this.setState({ removed })
      return
    }
    
    if (willSubscribe) {
      added = added.filter(item => item !== data)
    } else {
      added = added.concat(data)
    }
    
    this.setState({ added })
  }

  renderContent = () => {
    const { all, aliases, added, removed } = this.state;
    
    if (!all || !aliases) return null
    return all.map((data, i) => {
      return (
        <div key={i} className={EdaliasStyle.listContainer}>
          <Checkbox
            checked={(aliases.includes(data.id) || added.includes(data.id)) && !removed.includes(data.id)}
            className={EdaliasStyle.checkbox}
            onChange={() => this.toggleAlias(data.id)}
          />
          <div className={EdaliasStyle.title}>
            { data.id }
          </div>
          <div className={EdaliasStyle.description}>
            { data.desc }
          </div>
        </div>
      )
    })
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
