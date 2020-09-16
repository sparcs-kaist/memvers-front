import React, { Component } from 'react'
import axios from 'axios';

import { TextField, Button } from '@material-ui/core';

import SearchOnNuguStyle from './SearchOnNugu.css'
import { propertyName } from '../utils';

import defaultStyle from './default.css'

export default class SearchOnNugu extends Component {
  state = {
    querydata: '',
    objs: null,
    noresult: false,
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return (this.state.objs != nextState.objs) || (this.state.noresult != nextState.noresult)
  }

  handleChange = (e) => {
    this.setState({
      querydata: e.target.value
    })
  }

  search = async (e) => {
    const { querydata } = this.state
    try {
      const { notLoggedIn, data } = await axios.get(`/nugu/${querydata}`)
      if (notLoggedIn) return

      if (data.objs) {
        this.setState({ objs: data.objs })
        return
      }

      this.setState({
        noresult: false
      })

      const key = Math.random().toString(36).slice(2)
      this.setState({
        objs: null,
        noresult: key
      })

      setTimeout(() => {
        if (this.state.noresult !== key)
          return

        this.setState({
          noresult: false
        })
      }, 1500)
    } catch (err) {
      alert(err)
    }
  }

  renderContent = () => {
    const { objs } = this.state
    if (objs) {
      return objs.map((obj, i) => {
        return (
          <div key={i} className={SearchOnNuguStyle.listsContainer}>
            {
              Object.keys(obj).map((item, i) => {
                return (
                  <div key={i} className={SearchOnNuguStyle.listContainer}>
                    <div className={SearchOnNuguStyle.title}>
                      {propertyName(item)}
                    </div>
                    <div>
                      {obj[item] == "" || obj[item] == null ? (
                        <div className={SearchOnNuguStyle.nodata}>
                          -
                        </div>
                      ) : (
                        obj[item]
                      )}
                    </div>
                  </div>
                )
              })
            }
          </div>
        )
      })
    } else {
      const { querydata } = this.state
      return <div className={SearchOnNuguStyle.noResult}>
        {
          this.state.noresult ? (
            `No user with name "${querydata}"`
          ) : (
            <div className={SearchOnNuguStyle.waiting}>
              : )
            </div>
          )
        }
      </div>
    }
  }

  isEnter = (e) => {
    if (e.key == 'Enter') {
      this.search();
    }
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        <span className={defaultStyle.description}>
          SPARCS 회원을 검색합니다. 아래의 정보는 각 회원들이 Nugu 에 직접 입력한 정보로 구성되어 있습니다. Enter 를 눌러 검색할 수 있습니다.
        </span>
        <div className={SearchOnNuguStyle.searchField} onKeyPress={this.isEnter}>
          <TextField
            placeholder="아이디 또는 이름 입력"
            style={{width: '97%', marginRight: '3%'}}
            onChange={this.handleChange}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => this.search()}
          >
            검색
          </Button>
        </div>
        {this.renderContent()}
      </div>
    )
  }
}
