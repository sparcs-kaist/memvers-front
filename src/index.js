import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'

import { loginApi } from './api'
import 'babel-polyfill'

import Main from './components/Main'

// Initialize CSRF cookie
api.get('/', { validateStatus: false })
  .then(({ data, status }) => {
    if (status !== 418) {
      return Promise.reject(
        new Error("Server did not respond with correct status code!")
      )
    }

    Promise.resolve()
  })
  .then(() => {
    const render = Component => {
      ReactDOM.render(
        <AppContainer>
          <BrowserRouter>
            <Component />
          </BrowserRouter>
        </AppContainer>,
        document.getElementById('root')
      )
    }

    render(Main);

    if (module.hot) module.hot.accept('./components/Main', () => render(Main));
  })
  .catch(err => alert(err))
