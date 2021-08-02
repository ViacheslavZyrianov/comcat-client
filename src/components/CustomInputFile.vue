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
    >
      <svg class="button__icon" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"/></svg>
    </button>
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
    color: #fa366f;
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
