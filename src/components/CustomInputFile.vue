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
    compressImage (file, cb) {
      const blobURL = window.URL.createObjectURL(file)
      const img = new Image()
      img.src = blobURL

      img.onload = () => {
        const { width, height } = this.calculateAspectRatioFit(img.width, img.height, 600, 840)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(blob => cb(blob))
      }
    },
    calculateAspectRatioFit (srcWidth, srcHeight, maxWidth, maxHeight) {
      const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)
      return { width: srcWidth * ratio, height: srcHeight * ratio }
    },
    onChange (evt) {
      this.compressImage(evt.target.files[0], blob => {
        this.$emit('change', {
          name: evt.target.files[0].name,
          url: URL.createObjectURL(blob),
          image: blob
        })
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
