import Vue from 'vue'

export default {
  state: {
    comixList: [],
    isAddComixVisible: false,
    comixData: {
      id: null,
      title: null,
      universe: null,
      cover: null
    }
  },
  getters: {
    getComixById: state => id => state.comixList.find(comix => comix.id === id)
  },
  actions: {
    async fetchList ({ rootState, commit }) {
      try {
        const data = await Vue.$axios.get('/comix/list', {
          params: {
            user_id: rootState.user.user.id
          }
        })
        const comixList = await Promise.all(data.map(async comix => {
          const base64Response = await fetch(`data:image/jpeg;base64,${comix.image_base64}`)
          const blob = await base64Response.blob()
          return {
            id: comix.id,
            cover: {
              image: blob,
              url: URL.createObjectURL(blob),
              name: comix.image_name
            },
            title: comix.title,
            universe: comix.universe
          }
        }))

        commit('SET_COMIX_LIST', comixList)
      } catch (err) {
        throw new Error(err)
      }
    },
    async putItem ({ dispatch }, payload) {
      try {
        await Vue.$axios.put('/comix/update', payload)
        dispatch('fetchList')
      } catch (err) {
        throw new Error(err)
      }
    },
    async postItem ({ dispatch }, payload) {
      try {
        await Vue.$axios.post('/comix/add', payload)
        dispatch('fetchList')
      } catch (err) {
        throw new Error(err)
      }
    },
    async deleteItem ({ dispatch }, payload) {
      try {
        await Vue.$axios.delete('/comix/delete', {
          params: {
            id: payload
          }
        })
        dispatch('fetchList')
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  mutations: {
    SET_IS_ADD_EDIT_COMIX_VISIBLE (state, payload) {
      state.isAddComixVisible = payload
    },
    SET_COMIX_DATA (state, payload) {
      state.comixData = { ...state.comixData, ...payload }
    },
    SET_COMIX_LIST (state, payload) {
      state.comixList = payload
    }
  }
}
