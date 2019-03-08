import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

export default class SearchOnNugu extends Component {
  state = {
    querydata: '',
  }

  handleChange = (e) => {
    this.setState({
      querydata: e.target.value
    })
  }

  // search = async (e) => {
  //   const { querydata } = this.state
  //   try {
  //     const payload = await axios.post('https://memvers-api.sparcs.org/api/nugus', { name: querydata }, {withCredentials: true})
  //     if (payload.data.expired) window.location.href = '/login'
  //     else if (payload.data.result) {
  //       let objs = payload.data.objs
  //       if (objs) return objs.map(obj => <div>{obj}</div>)
  //     }
  //   } catch (err) {
  //     alert(err)
  //   }
  // }

  render() {
    return (
      <div>
        <TextField
          onChange={this.handleChange}
        />
        {/* <Button
          onClick={() => this.search()}
        >
          검색
        </Button> */}
      </div>
    )
  }
}
