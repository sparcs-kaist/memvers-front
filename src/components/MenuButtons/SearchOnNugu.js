import React, { Component } from 'react'
import axios from 'axios';

import { TextField, Button } from '@material-ui/core';

import SearchOnNuguStyle from './SearchOnNugu.css'

export default class SearchOnNugu extends Component {
  state = {
    querydata: '',
    objs: null
  }

  handleChange = (e) => {
    this.setState({
      querydata: e.target.value
    })
  }

  search = async (e) => {
    const { querydata } = this.state
    try {
      const payload = await axios.post('https://memvers-api.sparcs.org/api/nugus', { name: querydata }, {withCredentials: true})
      if (payload.data.expired) window.location.href = '/login'
      else if (payload.data.result) this.setState({ objs: payload.data.objs })
      else if (!payload.data.result) this.setState({ objs: null }) 
    } catch (err) {
      alert(err)
    }
  }

  renderContent = () => {
    const { objs } = this.state
    console.log(objs)
    if (objs) {
      return objs.map((obj, i) => {
        return (
          <div key={i} className={SearchOnNuguStyle.listsContainer}>
            {
              Object.keys(obj).map((item, i) => {
                return (
                  <div key={i} className={SearchOnNuguStyle.listContainer}>
                    <div className={SearchOnNuguStyle.title}>
                      {item}
                    </div>
                    <div>
                      {obj[item]}
                    </div>
                  </div>
                )
              })
            }
          </div>
        )
      })
    } else {
      return <div>
        No result
      </div>
    }
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        <TextField
          onChange={this.handleChange}
        />
        <Button
          onClick={() => this.search()}
        >
          검색
        </Button>
        {this.renderContent()}
      </div>
    )
  }
}
