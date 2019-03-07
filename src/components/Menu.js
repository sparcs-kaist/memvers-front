import React, { Component } from 'react'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import MenuStyle from './Menu.css'

export default class Menu extends Component {
  render() {
    return (
      <div className={MenuStyle.menuContainer}>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            hello
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            hellohello
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            hello
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            hellohello
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}
