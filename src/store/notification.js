export default {
  state: {
    notification: {
      type: 'info',
      text: ''
    }
  },
  mutations: {
    SET_NOTIFICATION (state, payload) {
      state.notification.type = payload.type
      state.notification.text = payload.text
    }
  }
}
