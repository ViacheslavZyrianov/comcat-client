import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.interceptors.response.use(({ data }) => data, error => Promise.reject(error))

Vue.$axios = axios
