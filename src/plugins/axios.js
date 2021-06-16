import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.interceptors.response.use(({ data }) => data, error => Promise.reject(error))

Vue.$axios = axios
