<template>
  <div :class="notificationClassList">
    {{ notification.text }}
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Notification',
  watch: {
    'notification.text' () {
      setTimeout(() => {
        this.SET_NOTIFICATION({
          text: ''
        })
      }, 2000)
    }
  },
  computed: {
    ...mapState({
      notification: 'notification'
    }),
    notificationClassList () {
      return [
        'notification',
        `notification_${this.notification.type}`,
        { 'notification_is-visible': this.notification.text }
      ]
    }
  },
  methods: {
    ...mapMutations({
      SET_NOTIFICATION: 'SET_NOTIFICATION'
    })
  }
}
</script>

<style lang="scss" scoped>
.notification {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  border-radius: 8px 8px 0 0;
  padding: 16px;
  color: #fff;
  transform: translateY(100%);
  transition: transform .3s;

  &_is-visible {
    transform: translateY(0);
  }

  &_info {
    background-color: #4742bc;
  }

  &_success {
    background-color: #10c971;
  }

  &_error {
    background-color: #fa366f;
  }
}
</style>
