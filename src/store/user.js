import Vue from 'vue'

export default {
  state: {
    user: null
  },
  actions: {
    async fetchUserByIdToken ({ state, commit }, payload) {
      try {
        const { sub: id, name, picture: imageUrl } = await Vue.$axios.get('https://oauth2.googleapis.com/tokeninfo', {
          params: {
            id_token: Vue.cookie.get('id_token')
          }
        })
        commit('SET_USER', {
          id,
          name,
          imageUrl
        })
      } catch (err) {
        throw Error(err)
      }
    }
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
    }
  }
}
