import React, { Component } from 'react'

import EdaliasStyle from './EdaliasAll.css'
import { Checkbox, Button, Fade, FormControlLabel, TextField } from '@material-ui/core'

import api from '../../api'
import defaultStyle from '../MenuButtons/default.css'

export default class Edalias extends Component {
  state = {
    all: null,
    editing: null,
    
    newUser: '',
    newText: null,
    newHidden: null,
    
    added: [],
    removed: []
  }

  async componentDidMount() {
    await this.fetchLists()
  }
  
  handleChange(value, input) {
    const update = {}
    update[input] = value
    
    this.setState(update)
  }
  
  async fetchLists() {
    try {
      const { notLoggedIn, data } = await api.get('/mailing')
      if (notLoggedIn) return

      const { all } = data
      this.setState({ all })
    } catch (err) {
      alert(err)
    }
  }
  
  async startEdit(id) {
    try {
      const { notLoggedIn, data } = await api.get(`/mailing/${id}`)
      if (notLoggedIn) return
      
      this.setState({ editing: data })
    } catch (err) {
      alert(err)
    }
  }
  
  cancelEdit() {
    this.setState({
      editing: null,
      newUser: '',
      newText: null,
      newHidden: null
    })
  }
  
  addUser() {
    const user = this.state.newUser
    if (this.state.removed.includes(user)) {
      this.setState({
        removed: this.state.removed.filter(v => v !== user),
        newUser: ''
      })
      return
    }
    
    this.setState({ added: this.state.added.concat(user), newUser: '' })
  }
  
  removeUser(user) {
    if (this.state.added.includes(user)) {
      this.setState({
        added: this.state.added.filter(v => v !== user)
      })
      return
    }
    
    this.setState({ removed: this.state.removed.concat(user) })
  }
  
  async saveList() {
    try {
      const { notLoggedIn } = await api.post(`/mailing/${this.state.editing.id}`, {
        desc: this.state.newText,
        isHidden: this.state.newHidden,
        added: this.state.added,
        removed: this.state.removed
      });
      
      if (notLoggedIn) return
      
      await this.fetchLists()
      this.cancelEdit()
    } catch(err) {
      alert(err)
    }
  }
  
  async deleteList(id) {
    try {
      const { notLoggedIn } = await api.delete(`/mailing/${id}`);
      if (notLoggedIn) return
      
      await this.fetchLists()
    } catch(err) {
      alert(err)
    }
  }
  
  renderEditing() {
    if (!this.state.editing) return null
    
    const subscribedUser = this.state.editing.users
      .filter(v => !this.state.removed.includes(v))
      .concat(this.state.added);
    
    const subscribedView = subscribedUser.map(user => {
      return (
        <div className={ EdaliasStyle.row } style={ { margin: '5px 0' } } key={ user }>
          <div className={ EdaliasStyle.primary }>
            { user }
          </div>
          <Button
            className={ EdaliasStyle.secondary }
            variant="outlined"
            color="secondary"
            onClick={ () => this.removeUser(user) }
          >
            삭제
          </Button>
        </div>
      )
    })
    
    return (
      <div className={ EdaliasStyle.edaContainer }>
        <span className={ defaultStyle.description }>
          메일링리스트 { this.state.editing.id }(을)를 편집합니다.
        </span>
        
        <div className={ EdaliasStyle.section }>
          <span className={ EdaliasStyle.title }>속성</span>
          <div className={ EdaliasStyle.row }>
            <TextField
              className={ EdaliasStyle.primary }
              label="메일링 리스트 설명"
              onChange={ e => this.handleChange(e.target.value, 'newText') }
              value={ this.state.newText === null ?  this.state.editing.desc : this.state.newText }
            />
          </div>
          
          <div className={ EdaliasStyle.row }>
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  checked={ this.state.newHidden === null ? this.state.editing.isHidden : this.state.newHidden }
                  onChange={ e => this.handleChange(e.target.checked, 'newHidden') }
                />
              }
              label="숨겨진 메일링 리스트로 설정"
              labelPlacement="end"
            />
          </div>
        </div>
        
        <div className={ EdaliasStyle.section }>
          <span className={ EdaliasStyle.title }>구독자</span>
          { subscribedView }
          
          <div className={ EdaliasStyle.row } style={ { marginTop: '10px' } }>
            <TextField
              className={ EdaliasStyle.primary }
              label="구독 사용자 추가"
              onChange={ e => this.handleChange(e.target.value, 'newUser') }
              value={ this.state.newUser }
            />
            
            <Button
              className={ EdaliasStyle.secondary }
              variant="outlined"
              color="primary"
              onClick={ () => this.addUser() }
            >
              사용자 추가
            </Button>
          </div>
        </div>
        
        <div className={ EdaliasStyle.section }>
          <span className={ EdaliasStyle.title }>작업</span>
          
          <div className={ EdaliasStyle.row } style={ { marginTop: '10px' } }>
            <Button
              style={ { margin: '0 10px' } }
              className={ EdaliasStyle.primary }
              variant="outlined"
              onClick={ () => this.cancelEdit() }
            >
              취소
            </Button>
          
            <Button
              style={ { margin: '0 10px' } }
              className={ EdaliasStyle.primary }
              variant="contained"
              color="primary"
              onClick={ () => this.saveList() }
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    )
  }

  renderList() {
    const { all } = this.state
    if (!all) return null
    
    const lists = all.map((data, i) => {
      return (
        <div key={i} className={EdaliasStyle.listContainer} style={ { margin: '5px 0' } }>
          <div className={EdaliasStyle.title}>
            { data.id }
          </div>
          <div className={EdaliasStyle.description}>
            { data.desc }
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={ () => this.startEdit(data.id) }
          >
            편집
          </Button>
          <Button
            style={ { marginLeft: '10px' } }
            variant="outlined"
            color="secondary"
            onClick={ () => this.deleteList(data.id) }
          >
            삭제
          </Button>
        </div>
      )
    })
    
    return (
      <div className={ EdaliasStyle.edaContainer }>
        <span className={ defaultStyle.description }>
          편집할 메일링 리스트를 클릭해주세요.
        </span>
        
        { lists }
      </div>
    )
  }

  render() {
    return this.state.editing ? this.renderEditing() : this.renderList()
  }
}
