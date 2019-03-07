import React, { Component } from 'react'
import axios from 'axios';

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import ChangePassword from './MenuButtons/ChangePassword'
import MenuStyle from './Menu.css'

export default class Menu extends Component {
  state = {
    expanded: '비밀번호 변경',
    isWheel: true,
  }

  componentDidMount = async () => {
    const payload = await axios.get('https://memvers-api.sparcs.org/api/un', {withCredentials: true})
    if (payload.data.expired) {
      this.props.history.push('/login')
    } else if (payload.data.un === 'wheel') {
      this.setState({ isWheel: true })
    }
  }

  handleChange = (menu) => {
    console.log(menu);
    this.setState({
      expanded: menu
    })
  }

  renderMenus = () => {
    const menus = [
      {
        name: "비밀번호 변경",
        component: <ChangePassword />
      },{
        name: "메일링 리스트 생성",
        component: <ChangePassword />
      },{
        name: "메일 포워딩 설정",
        component: <ChangePassword />
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
      </div>
    )
  }
}
