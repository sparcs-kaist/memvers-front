import React, { Component } from 'react'
import axios from 'axios';

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal'

import ChangePassword from './MenuButtons/ChangePassword'
import CreateList from './MenuButtons/CreateList'
import Forwarding from './MenuButtons/Forwarding'

import MenuStyle from './Menu.css'

export default class Menu extends Component {
  state = {
    isModalOpen: false,
    expanded: '',
    isWheel: true,
  }

  componentDidMount = async () => {
    try {
      let payload = await axios.get('https://memvers-api.sparcs.org/api/un', {withCredentials: true})
      if (payload.data.expired) {
        this.props.history.push('/login')
      } else if (payload.data.un === 'wheel') {
        this.setState({ isWheel: true })
      }
      payload = await axios.get('https://memvers-api.sparcs.org/api/forward', {withCredentials: true})
      if (payload.data.expired) {
        this.props.history.push('/login')
      }
    } catch (err) {
      alert(err)
    }
  }

  handleChange = (menu) => {
    this.setState({
      expanded: menu == this.state.expanded ? "" : menu
    })
  }

  checkLogout = () => {
    this.setState({
      isModalOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false
    })
  }

  logout = () => {
    axios.get('https://memvers-api.sparcs.org/api/logout', {withCredentials: true})
      .then(
        this.props.history.push('/login')
      )
  }

  renderMenus = () => {
    const menus = [
      {
        name: "비밀번호 변경",
        component: <ChangePassword />
      },{
        name: "메일링 리스트 생성",
        component: <CreateList />
      },{
        name: "메일 포워딩 설정",
        component: <Forwarding />
      },{
        name: "Alias 편집",
        component: <ChangePassword />
      },{
        name: "Nugu 편집",
        component: <ChangePassword />
      },{
        name: "Nugu 검색",
        component: <ChangePassword />
    }
    ].map((menu, i) => {
      return (
        <ExpansionPanel
          expanded = {this.state.expanded == menu.name}
          onChange = {() => this.handleChange(menu.name)}
          key={i}
        >
          <ExpansionPanelSummary>
            {menu.name}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {menu.component}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    })

    return (
      <div>
        <div className={MenuStyle.label}>
          기본 메뉴
        </div>
        <div>
          {menus}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={MenuStyle.menuContainer}>
        {this.renderMenus()}
        {
          this.state.isWheel
          ? (
            <div className={MenuStyle.wheelOnlyMenu}>
              <div className={MenuStyle.label}>
                  Wheel 전용 메뉴
              </div>
              <div>
                <ExpansionPanel
                  expanded={this.state.expanded == '회원 추가'}
                  onChange={() => this.handleChange('회원 추가')}
                >
                  <ExpansionPanelSummary>
                    회원 추가
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    휠만 가능
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                  expanded={this.state.expanded == '회원 삭제'}
                  onChange={() => this.handleChange('회원 삭제')}
                >
                  <ExpansionPanelSummary>
                    회원 삭제
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    휠만 가능
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </div>
          ) : (
            null
          )
        }
        <Button
          onClick={() => this.checkLogout()}
        >
          로그아웃
        </Button>

        <Modal
          open={this.state.isModalOpen}
          onClose={this.closeModal}
        >
          <div className={MenuStyle.warningModal}>
            정말 로그아웃 할까요?
            <div className={MenuStyle.buttons}>
              <Button
                style={{marginLeft: 'auto'}}
                onClick={() => this.closeModal()}
              >
                취소
              </Button>
              <Button onClick={() => this.logout()}>
                로그아웃
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
