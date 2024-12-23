import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VUE_APP_API_URL
axios.defaults.headers.common.Authorization = `Bearer ${import.meta.env.VUE_APP_GUEST_TOKEN}`

const apiService = {
  setRequestInterceptor (request, error) {
    axios.interceptors.request.use(request, error)
  },
  setResponseInterceptor (request, error) {
    axios.interceptors.response.use(request, error)
  },
  setBaseURL (baseURL) {
    axios.defaults.baseURL = baseURL
  },
  setAuthHeader (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  },
  removeAuthHeader () {
    axios.defaults.headers.common.Authorization = `Bearer ${import.meta.env.VUE_APP_GUEST_TOKEN}`
  },
  get (resource, params) {
    return axios.get(resource, { params })
  },
  post (resource, data, opts) {
    return axios.post(resource, data, opts)
  },
  put (resource, data, opts) {
    return axios.put(resource, data, opts)
  },
  delete (resource, data, opts) {
    return axios.delete(resource, data, opts)
  },
    /*
   Perform a custom Axios request.

   data is an object containing the following properties:
   - method
   - url
   - data ... request payload
   - auth (optional)
     - username
     - password
  */
     customRequest (data) {
      return axios(data)
    },
}

export default apiService