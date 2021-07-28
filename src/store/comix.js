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

        if (!data) return

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
    async putItem (_, payload) {
      try {
        await Vue.$axios.put('/comix/update', payload)
      } catch (err) {
        throw new Error(err)
      }
    },
    async postItem (_, payload) {
      try {
        const data = await Vue.$axios.post('/comix/add', payload)
        return data.id
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
    },
    SET_APPEND_COMIX_ITEM (state, payload) {
      state.comixList.push(payload)
    },
    SET_REMOVE_COMIX_ITEM_BY_ID (state, payload) {
      const comixToDeleteIndex = state.comixList.findIndex(comix => comix.id === payload)
      state.comixList.splice(comixToDeleteIndex, 1)
    }
  }
}
