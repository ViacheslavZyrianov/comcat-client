<template>
  <div class="input-file">
    <div class="filename">{{ placeholder }}</div>
    <input
      ref="file"
      type="file"
      name="image"
      accept="image/*"
      placeholder="Cover"
      @change="onChange"
    >
    <button
      v-if="value"
      class="input-file__delete"
      @click="onDelete"
    ></button>
  </div>
</template>

<script>
export default {
  name: 'CustomInputFile',
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    placeholder: {
      type: String,
      default: 'Upload file'
    }
  },
  methods: {
    onChange (evt) {
      this.$emit('change', {
        name: evt.target.files[0].name,
        url: URL.createObjectURL(evt.target.files[0]),
        image: evt.target.files[0]
      })
    },
    onDelete () {
      this.$emit('change', null)
      this.$refs.file.value = null
    }
  }
}
</script>

<style scoped lang="scss">
input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
}

.input-file {
  display: flex;
  flex-direction: column;
  position: relative;

  &__delete {
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 32px;
    border: none;
    background-color: transparent;

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
      height: 16px;
      border-radius: 2px;
      background: #fa366f;
    }

    &:before {
      transform: rotate(-45deg);
    }

    &:after {
      transform: rotate(45deg);
    }
  }
}

.filename {
  width: calc(100vw - 64px);
  border-radius: 4px;
  border: none;
  font-size: 14px;
  padding: 8px;
  background-color: #282642;
  color: rgba(255, 255, 255, 0.4);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 8px 40px 8px 8px;
}
</style>
