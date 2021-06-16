import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '927857982044-7n9vcp11bpoct9heu55djea80vbkja0r.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/userinfo.profile',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)
