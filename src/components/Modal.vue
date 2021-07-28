<template>
  <div class="modal">
    <div class="modal__body">
      <div
        class="modal__close"
        @click="onModalClose"
      />
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    onModalClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);

  &__body {
    position: relative;
    width: calc(100% - 32px);
    max-height: 90vh;
  }

  &__close {
    position: absolute;
    right: 0;
    top: -32px;
    width: 24px;
    height: 24px;

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 2px;
      height: 24px;
      background-color: #fff;
    }

    &:before {
      transform: rotate(-45deg);
    }

    &:after {
      transform: rotate(45deg);
    }
  }
}
</style>
