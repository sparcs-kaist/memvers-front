import React, { Component } from 'react'
import api from '../api'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Button } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'

import ChangePassword from './MenuButtons/ChangePassword'
import CreateList from './MenuButtons/CreateList'
import Forwarding from './MenuButtons/Forwarding'
import Edalias from './MenuButtons/Edalias'
import SearchOnNugu from './MenuButtons/SearchOnNugu'

import MenuStyle from './Menu.css'
import EditNugu from './MenuButtons/EditNugu'
import EdaliasAll from './MenuForWheel/EdaliasAll'
import AddUser from './MenuForWheel/AddUser'
import DeleteUser from './MenuForWheel/DeleteUser'
import WheelChangePassword from './MenuForWheel/ChangePassword'

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
      let { notLoggedIn, data } = await api.get('/un')
      if (notLoggedIn) return
      
      if (data.un === 'wheel') {
        this.setState({ isWheel: true })
      }
      
      const randomEmoji = this.randomEmoji()
      const randomText = this.randomText()
      await this.setState({ user: data.un, randomText, randomEmoji })
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
    api.post('/logout')
      .then(() => window.location.href = '/login')
  }

  randomEmoji = () => {
    const randomEmoji = [
      "( ´ ▽ ` )ﾉ",
      "( ﾟ▽ﾟ)/",
      "ᕕ( ᐛ )ᕗ",
      "(◕‿◕✿)",
      "╰(‘ω’ )╯"
    ]
    return randomEmoji[Math.floor(Math.random() * randomEmoji.length)]
  }

  randomText = () => {
    const randomText = [
      "반가워요, ",
      "안녕하세요, ",
      "어서와요, ",
      "기다렸어요, ",
      "잘 왔어요, ",
      "반갑네요, ",
      "오랜만이에요, "
    ]
    return randomText[Math.floor(Math.random() * randomText.length)]
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
        <img src={require('../images/exclamation-mark.png')} style={{width: 20, marginTop: 10}}/>
        <div style={{fontSize: '0.9rem'}}>
          <span style={{color: 'rgb(220,50,50)'}}>현재 메일 포워딩 기능이 정상적으로 동작하지 않습니다.</span><br />
          메일링 리스트를 받아보기 위해서는, 하단의 PDF 설명을 따라 메일 클라이언트에서 설정해주어야 합니다.
        </div>
        
        <a
          href="https://drive.google.com/file/d/1Rcm1eEUI8y0-jSEgziQQboNcfUBz0wjp/view"
          alt="메일함 설정" target="_blank" rel="noopener noreferrer"
          style={{textDecoration: 'none'}}
        >
          <div className={MenuStyle.pdfContainer}>
            메일 클라이언트 설정법
          </div>
        </a>
      </div>
    )
  }

  renderMenus = menuDescription => {
    if (!this.state.user) return null
    
    return menuDescription.map((menu, i) => {
      if (this.state.isWheel && menu.noWheel) return null
      
      return (
        <ExpansionPanel
          disabled = { menu.disabled }
          expanded = { this.state.expanded === menu.name }
          onChange = { () => this.handleChange(menu.name) }
          key={ i }
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              { menu.name }
              {
                menu.disabled ? (
                  <span style={{fontSize: '0.8rem', color: 'red'}}>
                    현재 동작하지 않습니다.
                  </span>
                ) : null
              }
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            { menu.component }
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    })
  }

  render() {
    return (
      <div className={MenuStyle.menuContainer}>
        { this.renderTitle() }
        
        <div>
          <div className={MenuStyle.label}>
            기본 메뉴
          </div>
          <div>
            {
              this.renderMenus([
                {
                  name: "비밀번호 변경",
                  component: <ChangePassword />
                },
                {
                  name: "새 메일링 리스트 생성",
                  component: <CreateList isWheel={this.state.isWheel} />
                },
                {
                  name: "메일 포워딩 설정",
                  component: <Forwarding />,
                  disabled: true
                },
                {
                  name: "메일링 리스트 설정",
                  component: <Edalias />
                },
                {
                  name: "나의 Nugu 정보",
                  component: <EditNugu />,
                  noWheel: true
                },
                {
                  name: "Nugu 에서 검색하기",
                  component: <SearchOnNugu />
                }
              ])
            }
          </div>
        </div>
        
        {
          this.state.isWheel ? (
            <div className={MenuStyle.wheelOnlyMenu}>
              <div className={MenuStyle.label}>
                Wheel 전용 메뉴
              </div>
              <div>
                {
                  this.renderMenus([
                    {
                      name: "메일링 리스트 관리",
                      component: <EdaliasAll />
                    },
                    {
                      name: "회원 비밀번호 변경",
                      component: <WheelChangePassword />
                    },
                    {
                      name: "회원 추가",
                      component: <AddUser />
                    },
                    {
                      name: "회원 삭제",
                      component: <DeleteUser />
                    }
                  ])
                }
              </div>
            </div>
          ) : null
        }

        <div>
          <div className={MenuStyle.informationLabel}>
            기능 설명
          </div>

          <div className={MenuStyle.information}>
            <div className={MenuStyle.informationHeader}>
              메일링 리스트
            </div>
            <div className={MenuStyle.informationBody}>
              sparcs.org 메일 서버로 전달되는 메일링 리스트를 관리합니다.
              내가 받아볼 메일링 리스트를 체크하거나, 새로운 메일링 리스트를 생성할 수 있습니다.
              예를 들어, sparcsunder 에 체크해두는 것은 sparcsunder@sparcs.org 로 수신되는 메일을 받겠다는 표시입니다.
            </div>
          </div>

          <div className={MenuStyle.information}>
            <div className={MenuStyle.informationHeader}>
              Nugu
            </div>
            <div className={MenuStyle.informationBody}>
              Nugu 는 SPARCS 내부의 회원 데이터베이스 관리 서비스입니다.
              타 회원의 정보를 검색할 수 있으며 나의 정보를 등록해 제공할 수도 있습니다.
              나의 Nugu 정보 메뉴에서 내 정보를 수정할 수 있습니다.
              비공개 설정은 SPARCS 공식 홈페이지에서 로그인하지 않은 외부 사용자에게 자신의 정보를 공개할 것인지 여부를 의미합니다.
            </div>
          </div>

          <div className={MenuStyle.warningText}>
            회원의 추가 및 삭제는 wheel 권한이 요구됩니다. 일반 회원은 자신을 삭제하거나 다른 사람을 추가할 수 없습니다.
            추가로, 메일링 리스트 관리 또한 wheel 권한이 요구됩니다.
          </div>
        </div>

        <Button
          variant="contained"
          style={{ width: '100%', height: 45, boxShadow: "none", marginTop: 20, marginBottom: 50}}
          color="secondary"
          onClick={() => this.checkLogout()}
        >
          로그아웃
        </Button>

        <div className={MenuStyle.credit}>
          Memvers 2020, made by medowhill / leo / nenw
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
