<template>
  <div
    v-if="isComixListLoaded"
    class="comix-list"
  >
    <div
      v-if="isComixListExists"
      class="comix-list__body"
    >
      <div
        v-for="comix in comixListFiltered"
        :key="comix.id"
        class="comix-list__comix"
      >
        <img
          :src="comix.cover.url"
          width="100%"
          class="comix__cover"
          @click="onFullComixImageModalOpen(comix.cover.url)"
        >
        <div class="comix__info">
          <div class="comix__title">{{ comix.title }}</div>
          <div class="comix__universe">{{ comix.universe }}</div>
          <hr class="divider">
          <div class="comix__buttons">
            <button
              class="button button_round button_yellow"
              @click="onEditComixClick(comix.id)"
            >
              <svg class="button__icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"/></svg>
            </button>
            <button
              :class="buttonDeleteComixItemClassList"
              @click="onDeleteComixClick(comix.id, comix.title)"
            >
              <svg class="button__icon" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isComixListNotFound"
      class="comix-list_not-found"
    >
      There is no such comix 😢
    </div>
    <div
      v-if="isComixListEmpty"
      class="comix-list_empty"
    >
      You still don't have any comix in your collection 😢
      <br><br>
      <button
        class="button button_big button_green"
        @click="onAddComix"
      >
        Add first comix
      </button>
    </div>
    <footer
      v-if="isFooter"
      class="comix-list__footer"
    >
      <button class="button button_round button_blue comix-list__filter">
        <svg class="button__icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"/></svg>
      </button>
      <input
        v-model="searchText"
        placeholder="Type to search..."
        type="text"
        name="search"
        class="input input_search"
        @input="onSearchInput"
      >
      <button
        class="button button_round button_green comix-list__add"
        @click="onAddComix"
      >
        <svg class="button__icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
      </button>
    </footer>
    <modal
      v-if="isFullComixImageModal"
      @close="onFullComixImageModalClose"
    >
      <img
        :src="comixFullImgURL"
        width="100%"
      >
    </modal>
  </div>
  <div
    v-else
    class="comix-list_not-loaded"
  >
    Waiting for comix list to load...
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import Modal from './Modal.vue'

export default {
  name: 'ComixList',
  components: {
    Modal
  },
  data () {
    return {
      isComixListLoaded: false,
      searchText: '',
      comixListFiltered: [],
      isButtonDeleteComixItemLoading: false,
      comixFullImgURL: null,
      isFullComixImageModal: false
    }
  },
  watch: {
    comixList: {
      handler () {
        this.comixListFiltered = [...this.comixList]
      },
      deep: true
    }
  },
  computed: {
    ...mapState('comix', [
      'comixList'
    ]),
    ...mapGetters({
      getComixById: 'comix/getComixById'
    }),
    buttonDeleteComixItemClassList () {
      return [
        'button',
        'button_round',
        { button_red: !this.isButtonDeleteComixItemLoading },
        { 'button_loading button_disabled': this.isButtonDeleteComixItemLoading }
      ]
    },
    isComixListExists () {
      return this.comixListFiltered.length
    },
    isComixListNotFound () {
      return this.searchText.length && this.comixListFiltered.length === 0
    },
    isComixListEmpty () {
      return this.searchText.length === 0 && this.comixListFiltered.length === 0
    },
    isFooter () {
      return this.comixList.length
    }
  },
  methods: {
    ...mapActions({
      fetchComixList: 'comix/fetchList',
      deleteComixItem: 'comix/deleteItem'
    }),
    ...mapMutations('comix', [
      'SET_IS_ADD_EDIT_COMIX_VISIBLE',
      'SET_COMIX_DATA',
      'SET_REMOVE_COMIX_ITEM_BY_ID'
    ]),
    ...mapMutations('notification', [
      'SET_NOTIFICATION'
    ]),
    onFullComixImageModalOpen (url) {
      this.isFullComixImageModal = true
      this.comixFullImgURL = url
    },
    onFullComixImageModalClose () {
      this.isFullComixImageModal = false
    },
    onSearchInput () {
      if (this.searchText) this.comixListFiltered = this.comixList.filter(({ title }) => title.toLowerCase().includes(this.searchText.toLowerCase()))
      else this.comixListFiltered = [...this.comixList]
    },
    onAddComix () {
      this.SET_IS_ADD_EDIT_COMIX_VISIBLE(true)
      this.SET_COMIX_DATA({
        id: null,
        title: null,
        universe: null,
        cover: null
      })
    },
    onEditComixClick (id) {
      this.SET_IS_ADD_EDIT_COMIX_VISIBLE(true)
      this.SET_COMIX_DATA(this.getComixById(id))
    },
    async onDeleteComixClick (id, title) {
      const isDeleteComix = window.confirm(`Delete comix ${title}?`)
      this.isDeleteComixLoading = true
      try {
        this.isButtonDeleteComixItemLoading = true
        if (isDeleteComix) await this.deleteComixItem(id)
        this.SET_REMOVE_COMIX_ITEM_BY_ID(id)
      } catch (err) {
        this.SET_NOTIFICATION(err)
      } finally {
        this.isButtonDeleteComixItemLoading = false
        this.isDeleteComixLoading = false
      }
    }
  },
  async created () {
    await this.fetchComixList()
    this.isComixListLoaded = true
  }
}
</script>

<style scoped lang="scss">
.comix-list {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);

  &__body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    grid-auto-rows: min-content;
    border-radius: 8px;
    margin-bottom: auto;
    transition: .5s;
    overflow: auto;
  }

  &__comix {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #282642;
    overflow: hidden;
    transition: width 0.3s;

    &_full {
      width: 100%;
    }
  }

  &__footer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 16px;
  }

  &__filter {
    margin-right: 16px;
  }

  &__add {
  }

  .input_search {
    flex: 1;
    margin-right: 16px;
  }

  &_empty,
  &_not-loaded,
  &_not-found {
    width: 100%;
    color: #fff;
    text-align: center;
    margin: auto;
  }

  &_empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 32px;
    margin-bottom: auto;
    margin-top: auto;
  }

  &_not-found {
    font-size: 32px;
  }
}

.comix {
  &__cover {
    flex: 1;
    max-height: 35vh;
    object-fit: cover;
    object-position: center center;
  }

  &__title {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;
  }

  &__info {
    color: #fff;
    padding: 16px 16px 8px 16px;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .button {
      margin-left: 8px;
    }
  }
}
</style>
