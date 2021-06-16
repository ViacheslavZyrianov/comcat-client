<template>
  <div id="app">
    <template v-if="user">
      <custom-header />
      <comix-list />
      <add-edit-comix />
      <notification />
    </template>
    <auth v-else />
  </div>
</template>

<script>
import CustomHeader from './components/CustomHeader.vue'
import ComixList from './components/ComixList.vue'
import AddEditComix from './components/AddEditComix.vue'
import Notification from './components/Notification.vue'
import Auth from './components/Auth.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    CustomHeader,
    ComixList,
    AddEditComix,
    Notification,
    Auth
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  created () {
    if (this.$cookie.get('id_token')) this.fetchUserByIdToken()
  },
  methods: {
    ...mapActions({
      fetchUserByIdToken: 'user/fetchUserByIdToken'
    })
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

 *{
   box-sizing: border-box;
   font-family: 'Roboto Condensed';

   &:before,
   &:after {
      box-sizing: border-box;
   }
 }

 body {
   margin: 0;
   height: 100vh;
   overflow: hidden;
 }

 #app {
   height: 100%;
 }

 input,
 select {
   border-radius: 4px;
   border: none;
   font-size: 14px;
   padding: 8px;
   background-color: #282642;
   color: #fff;

   &:focus {
     outline: none;
   }

   &::placeholder {
     color: rgba(255, 255, 255, 0.4);
  }
 }

 input {
   &[type="file"] {
     height: 32px;
     font-size: 0;
   }
 }

 .divider {
   background-color: #333149;
   height: 2px;
   border: none;
 }

 .container {
   padding: 16px;
   background-color: #211f39;
 }

 .button {
   display: flex;
   align-items: center;
   position: relative;
   border-radius: 0;
   border: none;
   color: #fff;

   &_green {
     background-color: #10c971;
     color: #fff;
   }

   &_yellow {
     background-color: #ff8a48;
     color: #fff;
   }

   &_red {
     background-color: #fa366f;
     color: #fff;
   }

   &_blue {
      background-color: #4742bc;
      color: #fff;
   }

   &_ghost {
     color: rgba(255, 255, 255, 0.5);
     background-color: transparent;
     border: none;
   }

   &_round {
     border-radius: 50%;
     width: 32px;
     height: 32px;
   }

   &_big {
     font-size: 16px;
     padding: 8px 16px;
   }

   &_add {
     &:before,
     &:after {
       content: '';
       position: absolute;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       margin: auto;
       width: 2px;
       height: 14px;
       border-radius: 2px;
       background: #fff;
     }

     &:after {
       transform: rotate(90deg);
     }
   }

   &_edit {
     &:before,
     &:after {
      content: '';
      position: absolute;
      transform: rotate(45deg);
     }

     &:before {
      top: 7px;
      right: 11px;
      width: 6px;
      height: 14px;
      border: 2px solid #fff;
      border-radius: 2px;
     }

     &:after {
      left: 7px;
      bottom: 8px;
      width: 0;
      height: 0;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      border-top: 4px solid rgb(255, 255, 255);
     }
   }

   &_delete {
     &:before,
     &:after {
       content: '';
       position: absolute;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       margin: auto;
       width: 2px;
       height: 14px;
       border-radius: 2px;
       background: #fff;
     }

     &:before {
       transform: rotate(45deg);
     }

     &:after {
       transform: rotate(-45deg);
     }
   }

   &_loading {
     animation: loading 1s linear infinite;

     @keyframes loading {
       100% {
         transform: rotate(360deg);
       }
     }
   }

   &_disabled {
     background-color: rgb(92, 92, 92);
     pointer-events: none;
   }

   &__icon {
     margin-left: 8px;
   }
 }
</style>
