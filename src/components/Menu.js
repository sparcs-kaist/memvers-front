import React, { Component } from 'react'
import axios from 'axios';

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal'

import ChangePassword from './MenuButtons/ChangePassword'
import CreateList from './MenuButtons/CreateList'
import Forwarding from './MenuButtons/Forwarding'
import Edalias from './MenuButtons/Edalias'
import SearchOnNugu from './MenuButtons/SearchOnNugu'

import MenuStyle from './Menu.css'
import EditNugu from './MenuButtons/EditNugu';
import AddUser from './MenuForWheel/AddUser';
import DeleteUser from './MenuForWheel/DeleteUser';

export default class Menu extends Component {
  state = {
    isModalOpen: false,
    expanded: '',
    isWheel: false,
    user: '',
    randomText: '',
    randomEmoji: '',
  }

  componentDidMount = async () => {
    try {
      let payload = await axios.get('https://memvers-api.sparcs.org/api/un', {withCredentials: true})
      if (payload.data.expired) {
        window.location.href = '/'
      } else if (payload.data.un === 'wheel') {
        this.setState({ isWheel: true })
      }
      const randomEmoji = this.randomEmoji()
      const randomText = this.randomText()
      await this.setState({ user: payload.data.un, randomText, randomEmoji })
    } catch (err) {
      // alert(err)
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
        window.location.href = '/login'
      )
  }

  randomEmoji = () => {
    const randomEmoji = [
      "( ´ ▽ ` )ﾉ",
      "( ﾟ▽ﾟ)/",
      "ᕕ( ᐛ )ᕗ",
      "(◕‿◕✿)",
      "╰(‘ω’ )╯",
    ]
    return randomEmoji[Math.floor(Math.random() * 3)]
  }

  randomText = () => {
    const rendomText = [
      "반가워요, ",
      "안녕하세요, ",
      "어서와요, ",
    ]
    return rendomText[Math.floor(Math.random() * 3)]
  }

  renderTitle = () => {
    const { randomEmoji, randomText, user } = this.state
    return (
      <div className={MenuStyle.titleContainer}>
        <div>
          {randomEmoji}
        </div>
        <div className={MenuStyle.titleHello}>
          {`${randomText}${user}!`}
        </div>
        <div className={MenuStyle.titleDescription}>
          Memvers 는 SPARCS 회원들의 설정 관리 웹 사이트 입니다. 하단의 메뉴에서 원하는 항목을 수정 / 변경 할 수 있습니다.
        </div>
      </div>
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
        component: <Edalias />
      },{
        name: "Nugu 편집",
        component: <EditNugu />
      },{
        name: "Nugu 검색",
        component: <SearchOnNugu />
    }
    ].map((menu, i) => {
      if (this.state.user == 'wheel' && menu.name == "Nugu 편집") return null
      else return (
        <ExpansionPanel
          expanded = {this.state.expanded == menu.name}
          onChange = {() => this.handleChange(menu.name)}
          key={i}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
        {this.renderTitle()}
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
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    회원 추가
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <AddUser />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                  expanded={this.state.expanded == '회원 삭제'}
                  onChange={() => this.handleChange('회원 삭제')}
                >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    회원 삭제
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <DeleteUser />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </div>
          ) : (
            null
          )
        }
        <Button
          variant="contained"
          style={{ width: '100%', height: 45, boxShadow: "none", marginTop: 20, marginBottom: 50}}
          color="secondary"
          onClick={() => this.checkLogout()}
        >
          로그아웃
        </Button>

        <div className={MenuStyle.credit}>
          Memvers 2019, made by medowhill / leo
        </div>
        <a href="https://github.com/sparcs-kaist/memvers-front" style={{textDecoration: 'none'}} target="_blank" rel="noopener noreferrer">
          <div className={MenuStyle.githubUrl}>
            <img src={require('../images/github_icon.png')} alt="github icon" className={MenuStyle.icon}/>
            Github · <span style={{color: 'gray'}}>memvers-front</span>
          </div>
        </a>

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
              <Button
                onClick={() => this.logout()}>
                로그아웃
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
