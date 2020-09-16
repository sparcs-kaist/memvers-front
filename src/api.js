import axios from 'axios'

const config = {
  baseURL: 'https://memvers-api.sparcs.org',
  withCredentials: true,
  xsrfCookieName: 'csrf-token',
  xsrfHeaderName: 'CSRF-Token'
}

const api = axios.create(Object.assign({}, config))
api.interceptors
  .response.use(
    resp => resp,
    err => {
      if (err.response.status === 401) {
        window.location.href = '/login'
        return Promise.resolve({ notLoggedIn: true })
      }

      if (err.response.status === 403) {
        alert("You're not wheel!")
        return Promise.resolve({ notLoggedIn: true })
      }

      return Promise.reject(err)
    }
  )

export default api
export const loginApi = axios.create(config)
