<template>
  <header>
    <div class="user">
      <img
        :src="user.imageUrl"
        class="user__avatar"
      >
      <div class="user__name">{{ user.name }}</div>
      <button
        class="button_ghost user__sign-out"
        @click="onSignOutClick"
      >
        Sign out
      </button>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'CustomHeader',
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    ...mapMutations({
      SET_USER: 'user/SET_USER'
    }),
    onSignOutClick () {
      const isSignOut = window.confirm('Do you really want to sign out?')
      if (isSignOut) {
        this.SET_USER(null)
        this.$cookie.delete('id_token')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 32px;
  margin-bottom: 16px;
}

.user {
  display: flex;
  align-items: center;

  &__avatar {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 8px;
  }

  &__name {
    flex: 1;
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__sign-out {
    margin-left: auto;
  }
}
</style>
