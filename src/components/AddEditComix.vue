<template>
  <div :class="addComixClassList">
    <div class="add-edit-comix__title">
      <template v-if="isModeAdd">Add new comix</template>
      <template v-if="isModeEdit">Edit comix</template>
    </div>
    <img
      v-if="coverURL"
      :src="coverURL"
      class="add-edit-comix__cover-preview"
    />
    <form
      class="add-edit-comix__form"
      @submit.prevent="onFormSubmit"
    >
      <custom-input-file
        :placeholder="coverPlaceholder"
        :value="comixData.cover"
        @change="onCoverChange"
      />
      <input
        v-model="title"
        type="text"
        placeholder="Input title"
      >
      <custom-select
        :default-value="comixData.universe"
        :list="universeList"
        placeholder="Choose universe"
        @change="onUniverseChange"
      />
      <div class="add-edit-comix__button-list">
        <button
          type="button"
          class="button button_ghost add-edit-comix__button-cancel"
          @click="onClose"
        >
          Cancel
        </button>
        <button
          type="submit"
          :class="uploadComixButtonClassList"
        ></button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

import CustomInputFile from './CustomInputFile.vue'
import CustomSelect from './CustomSelect.vue'

export default {
  name: 'AddEditComix',
  components: {
    CustomInputFile,
    CustomSelect
  },
  data () {
    return {
      title: null,
      universeList: ['DC', 'Marvel'],
      isButtonLoading: false,
      formData: null
    }
  },
  watch: {
    isAddComixVisible () {
      if (this.isAddComixVisible) this.title = this.comixData.title
    },
    title (title) {
      this.SET_COMIX_DATA({ title })
    }
  },
  computed: {
    ...mapState('comix', [
      'isAddComixVisible',
      'comixData',
      'comixList'
    ]),
    ...mapState({
      user: state => state.user.user
    }),
    isModeAdd () {
      return this.comixData.id === null
    },
    isModeEdit () {
      return this.comixData.id !== null
    },
    addComixClassList () {
      return [
        'container',
        'add-edit-comix',
        { 'add-edit-comix_visible': this.isAddComixVisible }
      ]
    },
    coverPlaceholder () {
      if (this.comixData.cover?.name) return this.comixData.cover?.name
      return 'Upload cover'
    },
    coverURL () {
      return this.comixData.cover?.url
    },
    uploadComixButtonClassList () {
      return [
        'button button_round button_green',
        { button_add: this.isModeAdd },
        { button_edit: this.isModeEdit },
        { button_green: !this.isButtonLoading },
        { 'button_loading button_disabled': this.isButtonLoading }
      ]
    }
  },
  methods: {
    ...mapActions({
      putComixItem: 'comix/putItem',
      postComixItem: 'comix/postItem'
    }),
    ...mapMutations('comix', [
      'SET_IS_ADD_EDIT_COMIX_VISIBLE',
      'SET_COMIX_DATA',
      'SET_APPEND_COMIX_LIST'
    ]),
    ...mapMutations({
      SET_NOTIFICATION: 'notification/SET_NOTIFICATION'
    }),
    clearForm () {
      this.formData = null
      this.onCoverChange(null)
    },
    async onFormSubmit () {
      try {
        this.formData = new FormData()
        this.formData.append('title', this.comixData.title)
        this.formData.append('universe', this.comixData.universe)
        this.formData.append('image', this.comixData.cover.image, this.comixData.cover.name)
        this.formData.append('user_id', this.user.id)
        this.isButtonLoading = true
        if (this.isModeAdd) {
          const newComixId = await this.postComixItem(this.formData)
          this.SET_APPEND_COMIX_LIST({
            id: newComixId,
            title: this.comixData.title,
            universe: this.comixData.universe,
            cover: this.comixData.cover
          })
        }
        if (this.isModeEdit) {
          this.formData.append('id', this.comixData.id)
          await this.putComixItem(this.formData)
          const updatedComix = this.comixList.find(comix => comix.id === this.comixData.id)
          updatedComix.title = this.comixData.title
          updatedComix.universe = this.comixData.universe
          updatedComix.cover = this.comixData.cover
        }
        this.SET_IS_ADD_EDIT_COMIX_VISIBLE(false)
        this.clearForm()
        this.SET_NOTIFICATION({
          type: 'success',
          text: 'Comix has been added!'
        })
      } catch (err) {
        this.SET_NOTIFICATION({
          type: 'error',
          text: 'Something went wrongily wrong'
        })
        throw new Error(err)
      } finally {
        this.isButtonLoading = false
      }
    },
    onClose () {
      this.SET_IS_ADD_EDIT_COMIX_VISIBLE(false)
    },
    onTitleChange (title) {
      this.SET_COMIX_DATA({ title })
    },
    onCoverChange (cover) {
      if (cover) this.SET_COMIX_DATA({ cover })
      else this.SET_COMIX_DATA({ cover: null })
    },
    onUniverseChange (universe) {
      this.SET_COMIX_DATA({ universe })
    }
  }
}
</script>

<style scoped lang="scss">
.add-edit-comix {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 32px;
  transform: translateY(100%);
  transition: transform .3s;
  background-color: #1c1a31;

  &_visible {
    transform: translateY(0);
  }

  &__form {
    display: grid;
    grid-gap: 16px;
  }

  &__title {
    font-size: 24px;
    font-weight: 500;
    color: #fff;
    margin-bottom: 16px;
  }

  &__cover-preview {
    max-width: 100%;
    max-height: 40vh;
    margin-bottom: 16px;
    margin: 0 auto 16px;
  }

  &__button-list {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__button-cancel {
    margin-right: 8px;
  }
}
</style>
